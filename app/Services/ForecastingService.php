<?php

namespace App\Services;

use GuzzleHttp\Client;

class ForecastingService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client(); // Create a new Guzzle HTTP client instance
    }

    public function predict(array $courseData)
    {
        $response = $this->client->post('http://127.0.0.1:5000/predict', [
            'json' => ['data' => $courseData]
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }
}
