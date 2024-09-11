from flask import Flask, jsonify, request
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Endpoint to get ARIMA predictions
@app.route('/predict', methods=['POST'])
def predict():
    # Load the time series data from request (example: date, grade)
    data = request.json['data']
    
    # Convert the data to a Pandas DataFrame
    df = pd.DataFrame(data)
    df['Date'] = pd.to_datetime(df['Date'])
    df.set_index('Date', inplace=True)
    
    # Fit the ARIMA model (you can adjust p, d, q parameters)
    model = ARIMA(df, order=(1, 1, 0))
    model_fit = model.fit()
    
    # Forecast the next 5 periods
    forecast_result = model_fit.get_forecast(steps=5)
    forecast = forecast_result.predicted_mean.tolist()
    confidence_intervals = forecast_result.conf_int(alpha=0.05).values.tolist()

    # Return the forecast and confidence intervals as JSON
    return jsonify({'forecast': forecast, 'confidence_intervals': confidence_intervals})

if __name__ == '__main__':
    app.run(debug=True)
