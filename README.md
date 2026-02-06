
# Shop♡Ease – E-commerce Intelligent Platform

Shop♡Ease is a modern Angular-based e-commerce platform developed by engineering students at ENSA Fès. It features a minimalist design focusing on user experience and is powered by a Machine Learning backend to provide intelligent product recommendations.

## 👥 The Team
* **Malak Bensaid** 
* **Hajar Slimani**
* **Douaa Berrahmo** 
* **Hachem Squalli ElHoussaini**
 
---


https://github.com/user-attachments/assets/8a3aa2d5-1dfc-4a70-b3b7-7df1ffc10e7b


## 🚀 Features
- **Dynamic Boutique:** Fetches products from a backend API with advanced filtering.
- **Smart Recommendations:** Integrated ML model logic to suggest pieces based on style.
- **Responsive Design:** Clean, "Poiret One" font-based aesthetic that works on all devices.
- **Interactive Cart:** Real-time price calculation and item management.

## 🛠 Tech Stack
- **Frontend:** Angular 17+
- **Styling:** CSS3 (Flexbox/Grid), Google Fonts
- **Backend/AI:** Python API (Machine Learning Model)

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Front-End-ML-e-commerce


2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment:**
Edit `src/environments/environment.ts` to point to your API (see instructions below).
4. **Run the app:**
```bash
ng serve

```


Navigate to `http://localhost:4200/`.



---

## ⚙️ How to Update the API Address

Since you are likely running a Python/FastAPI/Flask model locally or on a new server, you need to tell Angular where to find it.

### 1. Identify the API URL
* **Local ML Model:** Usually `http://127.0.0.1:8000` or `http://localhost:5000`.
* **Remote Server:** An IP or domain like `http://34.12.x.x:8000`.

### 2. Update Environment Files
Open `ecommerce-app/src/environments/environment.ts` (and `environment.development.ts`) and update the `apiUrl`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api' // <--- Change this to your new address
};
```





### 3. Verify the API Service

Ensure your `ApiService` (`src/app/services/api.service.ts`) is using the environment variable. It should look like this:

```typescript
import { environment } from '../../environments/environment';

// ... inside the class
private baseUrl = environment.apiUrl;

getBoutique(params: any) {
  return this.http.get<BoutiqueItem[]>(`${this.baseUrl}/products`, { params });
}
```





## 💡 Running the Local ML Model with the Frontend

If you are running a Python API for your model, follow these steps to ensure the Frontend can talk to it:

1. **Enable CORS:** Ensure your Python backend allows requests from `http://localhost:4200`. In FastAPI, it looks like this:
```python
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(CORSMiddleware, allow_origins=["*"])

```


2. **Start the Backend:** Run your script (e.g., `uvicorn main:app --reload`).
3. **Start the Frontend:** Run `ng serve`.
4. **Test:** Go to the "Boutique" tab. The `fetchProducts()` method in your `BoutiqueComponent` will now hit your local model's endpoint.

