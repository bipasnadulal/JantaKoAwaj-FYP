import joblib
import os
import numpy as np


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, 'models')

# loading vectorizer
tfidf_vectorizer = joblib.load(os.path.join(MODELS_DIR, "tfidf_vectorizer.pkl"))

# loading model
lr_model = joblib.load(os.path.join(MODELS_DIR, "lr_model.pkl"))
mult_nb_model = joblib.load(os.path.join(MODELS_DIR, "mult_NB_model_tuned.pkl"))
svm_model = joblib.load(os.path.join(MODELS_DIR, "svm_model.pkl"))


def classify_complaint(text):
    """
    Classify the complaint text as genuine or spam using ensemble learning.
    """

    features = tfidf_vectorizer.transform([text])


    
    lr_pred = lr_model.predict(features)[0]
    mult_nb_pred = mult_nb_model.predict(features)[0]
    svm_pred = svm_model.predict(features)[0]

    predictions = [lr_pred, mult_nb_pred, svm_pred]
    counts = np.bincount(predictions)
    final_prediction = np.argmax(counts)

    return "genuine" if final_prediction == 1 else "spam"

    