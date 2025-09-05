# JantaKoAwaj-FYP

**Janta Ko Aawaj** is a citizen-to-government-to-citizen (C2G2C) complaint system.  
It’s a platform where people can raise issues, others can vote to support them, and the system automatically alerts government authorities and media when an issue gains enough attention.  

## What It Does
- Citizens can **submit complaints** with details and location  
- People can **vote** to support or disagree with complaints  
- **ML spam filter** keeps irrelevant issues out  
- **Automatic alerts** go to authorities (25% / 50% votes) and media (75%)  
- **Dashboard** for tracking complaints and their progress

 ## Objective
- To build an interactive platform, Janta Ko Awaj, where citizens can raise complaints, vote on issues, and track authority responses.
- To use ML models (Naïve Bayes, Logistic Regression, SVM) for complaint filtering and send automated alerts to authorities and media based on public engagement.

## Tech Behind It
- **Frontend:** Next.js · React · Tailwind CSS · Material UI  
- **Backend:** Django · Django REST Framework · JWT Auth  
- **Database:** SQLite (for academic build, can be swapped later)  
- **Machine Learning:** Naive Bayes · Logistic Regression · SVM → Ensemble Voting (**99.75% accuracy**)  
- **Tools:** GitHub · Postman · VS Code · Jupyter Notebook

## Screenshots
### 1. Landing Page
![Landing Page](https://i.imgur.com/FiTqA7U.png)

### 2. Complaints Page
![Complaints Page](https://i.imgur.com/iSHO7Nr.png)

### 3. Complaint Submission Page
![Complaint Submission Page](https://i.imgur.com/b2eojyr.png)

### 4. User Dashboard
![User Dashboard](https://i.imgur.com/l6VjBYD.png)

### 5. User Notifications
![User Notifications Panel](https://i.imgur.com/2NVCA5e.png)

### 6. Authority Dashboard
![Authority Dashboard](https://i.imgur.com/lJCzOnY.png)

### 7. Complaints Assigned to Authority
![Complaints Assigned to Authority](https://i.imgur.com/rmC0EYz.png)

### 8. Authority Notifications
![Authority Notifications](https://i.imgur.com/AO8ADLh.png)
