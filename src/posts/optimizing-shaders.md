---
title: 'Bài 1: Cấu Hình Photon Fusion Cho Host Mode'
date: '2024-04-02'
tags: ['Photon Fusion', 'Unity', 'Host Mode', 'GameDev']
excerpt: 'Hướng dẫn chi tiết cách triển khai Photon Fusion để sử dụng chế độ Host Mode trong Unity, giúp đơn giản hóa triển khai mạng cho các trò chơi đa người chơi nhỏ.'
coverImage: 'https://i.pinimg.com/originals/05/3e/50/053e50e89442c41be8b9f10df1c1250f.gif'
imageHint: 'photon fusion'
---

## Giới thiệu về Photon Fusion và Host Mode

Chào mừng các bạn đã đến với series hướng dẫn về **Photon Fusion**! Trong bài viết đầu tiên này, chúng ta sẽ cùng nhau tìm hiểu cách cấu hình và triển khai một trong những chế độ mạng mạnh mẽ và tiện lợi nhất của Fusion: **Host Mode**.

**Host Mode** là một chế độ mạng trong đó một người chơi sẽ đóng vai trò vừa là **máy chủ (host)**, vừa là **người chơi (client)**. Thiết bị của người này sẽ trực tiếp quản lý trạng thái game và đồng bộ dữ liệu cho tất cả những người chơi khác kết nối vào.

#### Tại sao nên dùng Host Mode?
*   **Đơn giản:** Không cần một máy chủ chuyên dụng (dedicated server), giúp giảm chi phí và độ phức tạp khi triển khai.
*   **Độ trễ thấp cho Host:** Người chơi làm host sẽ có trải nghiệm gần như không có độ trễ (zero-latency) vì họ đang tương tác trực tiếp với phiên game.
*   **Lý tưởng cho game nhỏ:** Rất phù hợp cho các dự án game co-op hoặc đối kháng với quy mô nhỏ (từ 2 đến 8 người chơi).

Bây giờ, hãy cùng bắt tay vào cài đặt nhé!

---

## 1. Chuẩn bị và Cài đặt

Trước khi bắt đầu, hãy đảm bảo bạn đã có:
*   **Unity Editor:** phiên bản 2021.3 LTS hoặc mới hơn.
*   **Photon Fusion SDK:** Tải về từ Unity Asset Store hoặc trực tiếp từ [Photon Dashboard](https://dashboard.photonengine.com).
*   **App ID:** Lấy App ID miễn phí từ Photon Dashboard của bạn.

Sau khi đã nhập SDK vào dự án Unity, một cửa sổ `Photon Fusion Wizard` sẽ hiện ra. Hãy dán **App ID** của bạn vào đó để kết nối dự án với dịch vụ của Photon.

![Photon Fusion Wizard](https://github.com/user-attachments/assets/aba974ad-38f6-47a2-b672-5fad64d5aaf8)

---

## 2. Triển khai Logic Mạng

Để khởi chạy game ở chế độ Host Mode, chúng ta cần một script để quản lý việc bắt đầu và tham gia vào một phiên game.

### NetworkManager.cs

Đây là script trung tâm, chịu trách nhiệm khởi tạo `NetworkRunner` - trái tim của Photon Fusion.

*   `NetworkRunner` là component quản lý toàn bộ vòng lặp mạng, đồng bộ hóa, và các sự kiện mạng.
*   `StartGame()`: Hàm này sẽ khởi tạo `NetworkRunner`, thiết lập các thông số cần thiết và bắt đầu phiên game.
    *   `GameMode.AutoHostOrClient`: Đây là một chế độ rất linh hoạt. Nếu không tìm thấy phiên game nào có sẵn với `SessionName` đã cho, nó sẽ tự động tạo một phiên mới và trở thành **Host**. Nếu tìm thấy, nó sẽ tham gia với tư cách là **Client**.
    *   `INetworkRunnerCallbacks`: Bằng cách implement interface này, script của chúng ta có thể lắng nghe và phản ứng với các sự kiện mạng quan trọng như có người chơi tham gia, rời đi, hoặc nhận được dữ liệu input.

```csharp
using Fusion;
using Fusion.Sockets;
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class NetworkManager : MonoBehaviour, INetworkRunnerCallbacks
{
    private NetworkRunner _runner;

    public async void StartGame()
    {
        _runner = gameObject.AddComponent<NetworkRunner>();
        _runner.ProvideInput = true;
        _runner.AddCallbacks(this);

        // Chế độ tự động host hoặc client
        GameMode mode = GameMode.AutoHostOrClient; 

        var scene = SceneRef.FromIndex(SceneManager.GetActiveScene().buildIndex);
        await _runner.StartGame(new StartGameArgs()
        {
            GameMode = mode,
            SessionName = "RoomTest", // Đặt tên phòng để các client join cùng phòng này
            Scene = scene,
            SceneManager = gameObject.AddComponent<NetworkSceneManagerDefault>()
        });
    }

    // Callback khi người chơi tham gia vào game
    public void OnPlayerJoined(NetworkRunner runner, PlayerRef player)
    {
        Debug.Log($"Player {player} joined.");
        // Logic spawn player sẽ được xử lý ở một script khác
    }

    // Các callbacks khác...
    public void OnPlayerLeft(NetworkRunner runner, PlayerRef player) { }
    public void OnInput(NetworkRunner runner, NetworkInput input) { }
    public void OnInputMissing(NetworkRunner runner, PlayerRef player, NetworkInput input) { }
    public void OnShutdown(NetworkRunner runner, ShutdownReason shutdownReason) { }
    public void OnConnectedToServer(NetworkRunner runner) { }
    public void OnDisconnectedFromServer(NetworkRunner runner, NetDisconnectReason reason) { }
    public void OnConnectRequest(NetworkRunner runner, NetworkRunnerCallbackArgs.ConnectRequest request, byte[] token) { }
    public void OnConnectFailed(NetworkRunner runner, NetAddress remoteAddress, NetConnectFailedReason reason) { }
    public void OnUserSimulationMessage(NetworkRunner runner, SimulationMessagePtr message) { }
    public void OnSessionListUpdated(NetworkRunner runner, List<SessionInfo> sessionList) { }
    public void OnCustomAuthenticationResponse(NetworkRunner runner, Dictionary<string, object> data) { }
    public void OnHostMigration(NetworkRunner runner, HostMigrationToken hostMigrationToken) { }
    public void OnSceneLoadDone(NetworkRunner runner) { }
    public void OnSceneLoadStart(NetworkRunner runner) { }
    public void OnObjectExitAOI(NetworkRunner runner, NetworkObject obj, PlayerRef player) { }
    public void OnObjectEnterAOI(NetworkRunner runner, NetworkObject obj, PlayerRef player) { }
    public void OnReliableDataReceived(NetworkRunner runner, PlayerRef player, ReliableKey key, ArraySegment<byte> data) { }
    public void OnReliableDataProgress(NetworkRunner runner, PlayerRef player, ReliableKey key, float progress) { }
}
```

### CustomGameManager.cs

Đây là một script đơn giản để khởi động quá trình. Bạn có thể gắn nó vào một GameObject trống trong scene. Khi game bắt đầu, nó sẽ tìm đến `NetworkManager` và gọi hàm `StartGame()`.

```csharp
using Fusion;
using UnityEngine;

public class CustomGameManager : MonoBehaviour
{
    [SerializeField] private NetworkManager networkManager;
    
    void Start()
    {
        if (networkManager != null)
        {
            networkManager.StartGame();
            Debug.Log("Game started with NetworkManager.");
        }
        else
        {
            Debug.LogError("NetworkManager not found in the scene.");
        }
    }
}
```

---

## 3. Chạy thử

1.  Tạo một GameObject trống trong scene của bạn.
2.  Gắn script `NetworkManager.cs` vào GameObject đó.
3.  Tạo một GameObject khác và gắn script `CustomGameManager.cs` vào.
4.  Kéo GameObject chứa `NetworkManager` vào ô `networkManager` trên Inspector của `CustomGameManager`.
5.  Vào `File > Build Settings`, đảm bảo scene hiện tại của bạn đã được thêm vào danh sách build.
6.  Nhấn **Play** trong Unity Editor.

Nếu mọi thứ được cấu hình đúng, bạn sẽ thấy các log trong Console cho biết `NetworkRunner` đã khởi động. Unity Editor của bạn giờ đây đang hoạt động như một **Host**.

Để kiểm tra, bạn có thể build game ra một file thực thi (`.exe` hoặc `.app`) và chạy nó. File build này sẽ tự động tìm thấy phiên game đang chạy trên Editor và tham gia với tư cách là **Client**.

---

## Kết luận

Qua bài viết này, chúng ta đã cùng nhau thiết lập thành công một dự án Unity với Photon Fusion chạy ở chế độ **Host Mode**. Đây là bước đệm quan trọng để xây dựng các tính năng phức tạp hơn như spawn người chơi, đồng bộ trạng thái và xử lý input, những nội dung mà chúng ta sẽ tìm hiểu trong các bài viết tiếp theo.

Chúc các bạn thành công và hẹn gặp lại!

---
**Tác giả:** Persinus<br>
**Liên hệ:** nguyenmanh2004devgame@gmail.com
