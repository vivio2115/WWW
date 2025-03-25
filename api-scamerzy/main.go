package main

import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"net/url"
	"os"
	"os/signal"
	"strings"
	"sync"
	"syscall"
	"time"

	"github.com/google/uuid"
	"github.com/joho/godotenv"
)

type Data struct {
	Data string `json:"data"`
}

type pingResponseWriter struct {
	http.ResponseWriter
	startTime time.Time
}

var (
	currentData string = "Brak danych"
	dataMutex   sync.RWMutex
)

type ScammerReport struct {
	ID           string    `json:"id"`
	Nickname     string    `json:"nickname"`
	Description  string    `json:"description"`
	Images       []string  `json:"images"`
	Timestamp    time.Time `json:"timestamp"`
	ReportNumber int       `json:"report_number"`
	Status       string    `json:"status"`
}

type Service struct {
	Name        string    `json:"name"`
	Status      string    `json:"status"`      // operational, partial_outage, failed, itd.
	Uptime      string    `json:"uptime"`      // np. "99.99%"
	LastUpdated time.Time `json:"lastUpdated"` // data ostatniej aktualizacji
	Response    string    `json:"response"`    // np. "45ms" opóźnienie odpowiedzi
	LoadTrend   []int     `json:"loadTrend"`   // trend obciążenia (może posłużyć do wykresu)
}

type Incident struct {
	Date    string `json:"date"`
	Title   string `json:"title"`
	Status  string `json:"status"`
	Updates []struct {
		Time    string `json:"time"`
		Message string `json:"message"`
	} `json:"updates"`
}

var incidentsData = []Incident{
	{
		Date:   "22.03.2025",
		Title:  "Opóźnienia w systemie raportowania",
		Status: "investigating",
		Updates: []struct {
			Time    string `json:"time"`
			Message string `json:"message"`
		}{
			{Time: "12:15", Message: "Zauważono opóźnienia, badamy przyczynę."},
			{Time: "13:30", Message: "Identyfikacja problemu – baza danych."},
			{Time: "14:45", Message: "Tymczasowe poprawki wprowadzone."},
		},
	},
	// Dodaj więcej incydentów...
}

func corsMiddleware(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, x-api-key")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		handler(w, r)
	}
}

func (p *pingResponseWriter) WriteHeader(statusCode int) {
	duration := time.Since(p.startTime)
	p.Header().Set("x-ping", fmt.Sprintf("%d", duration.Milliseconds()))
	p.ResponseWriter.WriteHeader(statusCode)
}

func pingMiddleware(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		prw := &pingResponseWriter{
			ResponseWriter: w,
			startTime:      time.Now(),
		}
		handler(prw, r)
	}
}

type clientInfo struct {
	lastRequest time.Time
	count       int
}

var servicesData = []Service{
	{
		Name:        "Strona główna",
		Status:      "operational",
		Uptime:      "99.99%",
		LastUpdated: time.Date(2025, 3, 24, 14, 30, 0, 0, time.UTC),
		Response:    "45ms",
		LoadTrend:   []int{98, 97, 99, 98, 100, 99, 100, 99, 100, 99, 100},
	},
	{
		Name:        "API",
		Status:      "operational",
		Uptime:      "99.95%",
		LastUpdated: time.Date(2025, 3, 24, 14, 30, 0, 0, time.UTC),
		Response:    "120ms",
		LoadTrend:   []int{95, 96, 94, 97, 99, 98, 97, 96, 97, 98, 97},
	},
	{
		Name:        "Baza danych",
		Status:      "operational",
		Uptime:      "99.95%",
		LastUpdated: time.Date(2025, 3, 24, 14, 30, 0, 0, time.UTC),
		Response:    "120ms",
		LoadTrend:   []int{95, 96, 94, 97, 99, 98, 97, 96, 97, 98, 97},
	},
	{
		Name:        "System weryfikacji",
		Status:      "operational",
		Uptime:      "99.95%",
		LastUpdated: time.Date(2025, 3, 24, 14, 30, 0, 0, time.UTC),
		Response:    "120ms",
		LoadTrend:   []int{95, 96, 94, 97, 99, 98, 97, 96, 97, 98, 97},
	},
	{
		Name:        "System raportowania",
		Status:      "operational",
		Uptime:      "99.95%",
		LastUpdated: time.Date(2025, 3, 24, 14, 30, 0, 0, time.UTC),
		Response:    "120ms",
		LoadTrend:   []int{95, 96, 94, 97, 99, 98, 97, 96, 97, 98, 97},
	},
	{
		Name:        "Panel administracyjny",
		Status:      "operational",
		Uptime:      "99.95%",
		LastUpdated: time.Date(2025, 3, 24, 14, 30, 0, 0, time.UTC),
		Response:    "120ms",
		LoadTrend:   []int{95, 96, 94, 97, 99, 98, 97, 96, 97, 98, 97},
	},
	{
		Name:        "System zgłoszeń",
		Status:      "operational",
		Uptime:      "99.95%",
		LastUpdated: time.Date(2025, 3, 24, 14, 30, 0, 0, time.UTC),
		Response:    "120ms",
		LoadTrend:   []int{95, 96, 94, 97, 99, 98, 97, 96, 97, 98, 97},
	},
	{
		Name:        "CND",
		Status:      "operational",
		Uptime:      "99.95%",
		LastUpdated: time.Date(2025, 3, 24, 14, 30, 0, 0, time.UTC),
		Response:    "120ms",
		LoadTrend:   []int{95, 96, 94, 97, 99, 98, 97, 96, 97, 98, 97},
	},
}

var clients = sync.Map{}

const rateLimit = 5
const rateLimitWindow = time.Minute

func rateLimiterMiddleware(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		apiKey := r.Header.Get("x-api-key")
		expectedKey := os.Getenv("API_KEY")
		if apiKey != "" && apiKey == expectedKey {
			handler(w, r)
			return
		}

		if r.URL.Query().Get("bypassRateLimit") == "true" {
			handler(w, r)
			return
		}

		ip := r.RemoteAddr
		if colon := strings.LastIndex(ip, ":"); colon != -1 {
			ip = ip[:colon]
		}
		now := time.Now()
		infoRaw, _ := clients.LoadOrStore(ip, &clientInfo{lastRequest: now, count: 0})
		info := infoRaw.(*clientInfo)
		if now.Sub(info.lastRequest) > rateLimitWindow {
			info.count = 0
			info.lastRequest = now
		}
		info.count++
		if info.count > rateLimit {
			http.Error(w, "Too Many Requests", http.StatusTooManyRequests)
			return
		}
		handler(w, r)
	}
}

func logMiddleware(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		reqID := uuid.New().String()
		start := time.Now()
		log.Printf("[Request:%s] Received %s request from %s for %s", reqID, r.Method, r.RemoteAddr, r.URL.Path)
		handler(w, r)
		duration := time.Since(start)
		log.Printf("[Request:%s] Completed in %v", reqID, duration)
	}
}

func initLogging() {
	logFile, err := os.OpenFile("logs.txt", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
	if err != nil {
		log.Fatalf("Failed to open log file: %v", err)
	}
	mw := io.MultiWriter(os.Stdout, logFile)
	log.SetOutput(mw)
	log.SetFlags(log.LstdFlags)
}

func getHandler(w http.ResponseWriter) {
	dataMutex.RLock()
	d := currentData
	dataMutex.RUnlock()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Data{Data: d})
}

func postHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}
	var input Data
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, `{"data": "Invalid JSON"}`, http.StatusBadRequest)
		return
	}

	dataMutex.Lock()
	currentData = input.Data
	dataMutex.Unlock()

	log.Printf("Data has been updated: %s", input.Data)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func uploadImageToImgur(file multipart.File, _ *multipart.FileHeader) (string, error) {
	data, err := io.ReadAll(file)
	if err != nil {
		return "", err
	}
	encoded := base64.StdEncoding.EncodeToString(data)
	form := url.Values{}
	form.Add("image", encoded)
	form.Add("type", "base64")

	req, err := http.NewRequest("POST", "https://api.imgur.com/3/upload", strings.NewReader(form.Encode()))
	if err != nil {
		return "", err
	}
	clientID := os.Getenv("IMGUR_CLIENT_ID")
	req.Header.Add("Authorization", "Client-ID "+clientID)
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Add("Accept", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var result struct {
		Data struct {
			Link string `json:"link"`
		} `json:"data"`
		Success bool `json:"success"`
		Status  int  `json:"status"`
	}
	if err := json.Unmarshal(body, &result); err != nil {
		log.Printf("Imgur response body: %s", string(body))
		return "", err
	}
	if !result.Success {
		return "", fmt.Errorf("imgur upload failed with status %d", result.Status)
	}
	return result.Data.Link, nil
}

func reportScammerHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	if err := r.ParseMultipartForm(10 << 20); err != nil {
		http.Error(w, "Form processing error", http.StatusBadRequest)
		return
	}

	id := r.FormValue("id")
	nickname := r.FormValue("nickname")
	description := r.FormValue("description")

	var imageLinks []string
	for key, fileHeaders := range r.MultipartForm.File {
		if strings.HasPrefix(key, "images") {
			for _, fileHeader := range fileHeaders {
				file, err := fileHeader.Open()
				if err != nil {
					log.Printf("Error opening file %s: %v", key, err)
					continue
				}
				defer file.Close()

				link, err := uploadImageToImgur(file, fileHeader)
				if err != nil {
					log.Printf("Error uploading %s to Imgur: %v", key, err)
					continue
				}
				imageLinks = append(imageLinks, link)
			}
		}
	}

	var reports []ScammerReport
	data, err := os.ReadFile("scamers.json")
	if err != nil || len(data) == 0 {
		reports = []ScammerReport{}
	} else if err := json.Unmarshal(data, &reports); err != nil {
		log.Printf("Decoding error scamers.json: %v\n", err)
		reports = []ScammerReport{}
	}

	newReport := ScammerReport{
		ID:           id,
		Nickname:     nickname,
		Description:  description,
		Images:       imageLinks,
		Timestamp:    time.Now(),
		ReportNumber: len(reports) + 1,
		Status:       "do weryfikacji",
	}

	reports = append(reports, newReport)

	newData, err := json.MarshalIndent(reports, "", "  ")
	if err != nil {
		http.Error(w, "Data recording error", http.StatusInternalServerError)
		return
	}
	if err := os.WriteFile("scamers.json", newData, 0644); err != nil {
		http.Error(w, "Error writing to file", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status": "success",
		"msg":    "Report saved successfully",
		"number": fmt.Sprintf("%d", newReport.ReportNumber),
	})
}

func viewScamersHandler(w http.ResponseWriter, r *http.Request) {
	data, err := os.ReadFile("scamers.json")
	if err != nil || len(data) == 0 {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode([]ScammerReport{})
		return
	}
	var reports []ScammerReport
	if err := json.Unmarshal(data, &reports); err != nil {
		http.Error(w, "Error reading reports", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(reports)
}

func updateReportStatusHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	var payload struct {
		ReportNumber int    `json:"report_number"`
		NewStatus    string `json:"new_status"`
	}
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	filePath := "scamers.json"
	data, err := os.ReadFile(filePath)
	var reports []ScammerReport
	if err != nil || len(data) == 0 {
		reports = []ScammerReport{}
	} else if err := json.Unmarshal(data, &reports); err != nil {
		http.Error(w, "Error decoding reports", http.StatusInternalServerError)
		return
	}

	var updatedReport *ScammerReport = nil
	updated := false
	for i, report := range reports {
		if report.ReportNumber == payload.ReportNumber {
			reports[i].Status = payload.NewStatus
			updated = true
			updatedReport = &reports[i]
			break
		}
	}
	if !updated {
		http.Error(w, "Report not found", http.StatusNotFound)
		return
	}

	newData, err := json.MarshalIndent(reports, "", "  ")
	if err != nil {
		http.Error(w, "Error encoding updated report", http.StatusInternalServerError)
		return
	}
	if err := os.WriteFile(filePath, newData, 0644); err != nil {
		http.Error(w, "Error writing reports file", http.StatusInternalServerError)
		return
	}

	if payload.NewStatus == "zweryfikowany" && updatedReport != nil {
		if err := sendDiscordNotification(*updatedReport); err != nil {
			log.Printf("Error sending notification to Discord: %v", err)
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status": "success",
		"msg":    "Report status updated",
	})
}

func sendDiscordNotification(report ScammerReport) error {
	channelID := "1353330964226510858" // Docelowy kanał
	botToken := os.Getenv("DISCORD_TOKEN")
	if botToken == "" {
		return fmt.Errorf("DISCORD_TOKEN not set in environment")
	}

	url := fmt.Sprintf("https://discord.com/api/v10/channels/%s/messages", channelID)

	embed := map[string]interface{}{
		"title":       "Nowe zgłoszenie",
		"description": fmt.Sprintf("**ID:** %s\n**Nick:** %s\n**Opis:** %s", report.ID, report.Nickname, report.Description),
		"color":       5814783,
	}
	if len(report.Images) > 0 {
		embed["image"] = map[string]interface{}{
			"url": report.Images[0],
		}
	}

	payload := map[string]interface{}{
		"embeds": []any{embed},
	}
	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	req, err := http.NewRequest("POST", url, bytes.NewReader(payloadBytes))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bot "+botToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	if resp.StatusCode >= 400 {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("discord API error: %s", body)
	}
	return nil
}

func apiKeyMiddleware(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		apiKey := r.Header.Get("x-api-key")
		expectedKey := os.Getenv("API_KEY")
		if apiKey == "" || apiKey != expectedKey {
			log.Printf("Unauthorized request from %s: missing or invalid API key", r.RemoteAddr)
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		log.Printf("Authorized request from %s", r.RemoteAddr)
		handler(w, r)
	}
}

func servicesHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Metoda niedozwolona", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(servicesData)
}

func updateServiceHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Metoda niedozwolona", http.StatusMethodNotAllowed)
		return
	}

	var updatedService Service
	if err := json.NewDecoder(r.Body).Decode(&updatedService); err != nil {
		http.Error(w, "Nieprawidłowy payload JSON", http.StatusBadRequest)
		return
	}

	// Wyszukiwanie usługi po nazwie i aktualizacja jej danych.
	found := false
	for i, service := range servicesData {
		if service.Name == updatedService.Name {
			updatedService.LastUpdated = time.Now().UTC() // ustawiamy czas aktualizacji na teraz
			servicesData[i] = updatedService
			found = true
			break
		}
	}

	if !found {
		http.Error(w, "Usługa nie znaleziona", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status": "success",
		"msg":    "Usługa została zaktualizowana pomyślnie",
	})
}

func incidentsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Metoda niedozwolona", http.StatusMethodNotAllowed)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(incidentsData)
}

func main() {
	initLogging()
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, make sure environment variables are set")
	}
	http.HandleFunc("/api/v1/test", logMiddleware(rateLimiterMiddleware(corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodPost:
			postHandler(w, r)
		case http.MethodGet:
			getHandler(w)
		default:
			http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		}
	}))))
	http.HandleFunc("/api/v1/health", logMiddleware(rateLimiterMiddleware(corsMiddleware(apiKeyMiddleware(healthHandler)))))
	http.HandleFunc("/api/v1/report-scammer", logMiddleware(rateLimiterMiddleware(corsMiddleware(apiKeyMiddleware(reportScammerHandler)))))
	http.HandleFunc("/api/v1/view-scamers", logMiddleware(rateLimiterMiddleware(corsMiddleware(apiKeyMiddleware(viewScamersHandler)))))
	http.HandleFunc("/api/v1/update-report", logMiddleware(rateLimiterMiddleware(corsMiddleware(apiKeyMiddleware(updateReportStatusHandler)))))
	http.HandleFunc("/api/v1/services", logMiddleware(rateLimiterMiddleware(corsMiddleware(apiKeyMiddleware(pingMiddleware(servicesHandler))))))
	http.HandleFunc("/api/v1/incidents", logMiddleware(rateLimiterMiddleware(corsMiddleware(apiKeyMiddleware(pingMiddleware(incidentsHandler))))))
	port := "8080"
	server := &http.Server{Addr: ":" + port}

	idleConnsClosed := make(chan struct{})
	go func() {
		sigint := make(chan os.Signal, 1)
		signal.Notify(sigint, os.Interrupt, syscall.SIGTERM)
		<-sigint
		log.Println("Shutdown signal received, closing server gracefully...")
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		if err := server.Shutdown(ctx); err != nil {
			log.Printf("Error during server shutdown: %v", err)
		}
		close(idleConnsClosed)
	}()

	log.Println("API server starts on port", port)
	if err := server.ListenAndServe(); err != http.ErrServerClosed {
		log.Println("Server startup error:", err)
		os.Exit(1)
	}

	<-idleConnsClosed
}
