<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WebhookController extends Controller
{
    public function orangeMoney(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        return $this->handlePayment($data, 'payToken', 'status', 'message');
    }

    public function mtnMoney(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        return $this->handlePayment($data, 'MessageId', 'Status', 'body');
    }

    private function normalizeStatus(string $status): string
    {
        $status = strtolower($status);

        return in_array($status, ['successful', 'successfull']) ? 'completed' : $status;
    }

    private function handlePayment(array $data, string $tokenKey, string $statusKey, string $messageKey)
    {
        file_put_contents(public_path('webhook_log_transaction.txt'), json_encode($data), FILE_APPEND);

        if (! isset($data[$tokenKey], $data[$statusKey])) {
            return response()->json(['error' => 'Invalid payload'], 400);
        }

        return response()->json(['message' => 'Transaction processed'], 200);
    }
}
