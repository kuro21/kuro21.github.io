    var webPush = require('web-push');
     
    const vapidKeys = {
       "publicKey": "BAa8rhYLT8ZhfzyG_tkkx_3TIBpJvTT9SVM8rurKPsEphCXLsLBnvBd0Yc6uGlKnV7QZ0rGqfnl-SfHm3bkjTbw",
       "privateKey": "3PZfaPh1c-VRwM-AP3rYCcycnyLaETP5a4a3K43Cz_0"
    };
     
     
    webPush.setVapidDetails(
       'mailto:example@yourdomain.org',
       vapidKeys.publicKey,
       vapidKeys.privateKey
    )
    var pushSubscription = {
       "endpoint": " https://fcm.googleapis.com/fcm/send/eacUhxvlj-M:APA91bHqS-sGXxol73BnDrFy42yTYHcp-6L25845SRTjC1AtCO-v9_Joi-HIFX5mVgOzf-bMk3HC4zKO9M-e1K8kd2m8bHJKIYQJ8V4DhqWzwR0p4VZzHn-vUwOuaEj_cGg_TfJt9fES",
       "keys": {
           "p256dh": "BCdi1x3hrPhyCjWMOGOta1lLGh0+zfV40uXiJofagAIJJ+imYzmjiynoRRAePeq/rhlzP8XahruyZjFmpv+culE=",
           "auth": "IyYyWg6CZWbC9ddQrcuQ1g=="
       }
    };
    var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
     
    var options = {
       gcmAPIKey: '1013902555255',
       TTL: 60
    };
    webPush.sendNotification(
       pushSubscription,
       payload,
       options
    );