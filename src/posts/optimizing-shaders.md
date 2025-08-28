---
title: 'Bài 1: Cấu Hình Photon Fusion Cho Host Mode'
date: '2020-04-02'
tags: ['Photon Fusion', 'Unity', 'Host Mode']
excerpt: 'Hướng dẫn chi tiết cách triển khai Photon Fusion để sử dụng chế độ Host Mode trong Unity, giúp đơn giản hóa triển khai mạng cho các trò chơi đa người chơi nhỏ.'
coverImage: 'https://i.pinimg.com/originals/05/3e/50/053e50e89442c41be8b9f10df1c1250f.gif'
imageHint: 'photon fusion'
---

<h1>Cấu Hình Photon Fusion Cho Host Mode</h1>
<p>Hướng dẫn chi tiết cách triển khai <b>Photon Fusion</b> để sử dụng chế độ <b>Host Mode</b> trong Unity. <b>Host Mode</b> cho phép một thiết bị đóng vai trò vừa là máy chủ (host) vừa là client, giúp đơn giản hóa triển khai mạng cho các trò chơi đa người chơi nhỏ.</p>
<hr>
<h2>1. Giới Thiệu</h2>
<h3>Host Mode là gì?</h3>
<p><b>Host Mode</b> là chế độ trong Photon Fusion nơi một client hoạt động như một máy chủ, đồng thời quản lý kết nối và đồng bộ dữ liệu cho các client khác.</p>
<ul>
  <li>Không cần máy chủ trung tâm.</li>
  <li>Giảm độ trễ cho host (do không phải thông qua máy chủ bên thứ ba).</li>
  <li>Thích hợp cho các trò chơi có số lượng người chơi nhỏ.</li>
</ul>
<hr>
<h2>2. Cài Đặt</h2>
<h3>Yêu Cầu</h3>
<ul>
  <li><b>Unity:</b> 2021.3 LTS hoặc mới hơn.</li>
  <li><b>Photon App ID:</b> Đăng ký tại <a href="https://dashboard.photonengine.com" target="_blank">Photon Dashboard</a>.</li>
</ul>
<h3>Các Bước Cài Đặt</h3>
<ol>
  <li><b>Cài đặt Photon Fusion SDK</b>
    <ul>
      <li>Tải Photon Fusion từ Unity Asset Store hoặc <a href="https://dashboard.photonengine.com" target="_blank">Photon Dashboard</a>.</li>
      <li>Nhập App ID của bạn vào <code>Photon Fusion Wizard</code>.</li>
    </ul>
  </li>
  <li><b>Cấu hình Unity</b>
    <ul>
      <li>Tạo một scene mới hoặc sử dụng scene hiện tại trong dự án của bạn.</li>
    </ul>
  </li>
</ol>
<hr>
<h2>3. Triển Khai</h2>
<p>Dưới đây là các file cấu hình cơ bản cho Host Mode. Bạn có thể xem các đoạn mã chi tiết bên dưới:</p>
<ul>
  <li><b>NetworkManager.cs</b>: Quản lý kết nối mạng và các callback.</li>
  <li><b>CustomGameManager.cs</b>: Khởi động game và gọi NetworkManager.</li>
  <li><b>NetworkInputData.cs</b>: Định nghĩa dữ liệu input mạng.</li>
  <li><b>PlayerSpawner.cs</b>: Xử lý spawn player và input.</li>

</ul>

<p>Hình ảnh minh họa cho cấu hình Photon Fusion trong Host Mode:
<img src="https://github.com/user-attachments/assets/aba974ad-38f6-47a2-b672-5fad64d5aaf8" alt="Photon Fusion Host Mode" style="width: 100%; max-width: 600px; height: auto;" /></p>
</p>

### NetworkManager.cs
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

        GameMode mode = GameMode.AutoHostOrClient; // Chế độ tự động host hoặc client

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

    }

    // Callback khi người chơi rời khỏi game
    public void OnPlayerLeft(NetworkRunner runner, PlayerRef player)
    {
        Debug.Log($"Player left: {player}");
    }

    // Callback để gửi dữ liệu đầu vào từ client
    public void OnInput(NetworkRunner runner, NetworkInput input)
    {
        // Dùng để gửi các lệnh đầu vào (Input) đến server
    }

    // Callback khi thiếu đầu vào từ người chơi
    public void OnInputMissing(NetworkRunner runner, PlayerRef player, NetworkInput input)
    {
        Debug.LogWarning($"Missing input from player: {player}");
    }

    // Callback khi Runner bị tắt
    public void OnShutdown(NetworkRunner runner, ShutdownReason shutdownReason)
    {
        Debug.Log($"NetworkRunner has shut down. Reason: {shutdownReason}");
        CleanupResources();
    }
    private void CleanupResources(){
        if (_runner != null)
        {
            Destroy(_runner.gameObject); // Hủy NetworkRunner nếu cần
        }
        // Xóa các tài nguyên khác (nếu có)
    }
    public void OnConnectedToServer(NetworkRunner runner)
    {
        Debug.Log("Connected to server");
    }
    public void OnDisconnectedFromServer(NetworkRunner runner, NetDisconnectReason reason)
    {
        Debug.LogWarning($"Disconnected from server: {reason}");
    }
    public void OnConnectRequest(NetworkRunner runner, NetworkRunnerCallbackArgs.ConnectRequest request, byte[] token)
    {
        Debug.Log($"Connection request from {request.RemoteAddress}");
    }
    public void OnConnectFailed(NetworkRunner runner, NetAddress remoteAddress, NetConnectFailedReason reason)
    {
        Debug.LogError($"Connect failed to {remoteAddress}: {reason}");
    }
    public void OnUserSimulationMessage(NetworkRunner runner, SimulationMessagePtr message)
    {
        Debug.Log("Simulation message received");
    }
    public void OnSessionListUpdated(NetworkRunner runner, List<SessionInfo> sessionList)
    {
    }
    public void OnCustomAuthenticationResponse(NetworkRunner runner, Dictionary<string, object> data)
    {
        Debug.Log("Custom authentication response received");
    }
    public void OnHostMigration(NetworkRunner runner, HostMigrationToken hostMigrationToken)
    {
    }
    public void OnSceneLoadDone(NetworkRunner runner)
    {
        Debug.Log("Scene load done");
    }
    public void OnSceneLoadStart(NetworkRunner runner)
    {
        Debug.Log("Scene load started");
    }
    public void OnObjectExitAOI(NetworkRunner runner, NetworkObject obj, PlayerRef player)
    {
        Debug.Log($"Object {obj.name} exited AOI for player {player}");
    }
    public void OnObjectEnterAOI(NetworkRunner runner, NetworkObject obj, PlayerRef player)
    {
        Debug.Log($"Object {obj.name} entered AOI for player {player}");
    }
    public void OnReliableDataReceived(NetworkRunner runner, PlayerRef player, ReliableKey key, ArraySegment<byte> data)
    {
        Debug.Log($"Reliable data received from {player}");
    }
    public void OnReliableDataProgress(NetworkRunner runner, PlayerRef player, ReliableKey key, float progress)
    {
        Debug.Log($"Reliable data progress from {player}: {progress * 100}%");
    }
}
```

### CustomGameManager.cs
```csharp
using Fusion;
using UnityEngine;

public class CustomGameManager : MonoBehaviour
{
    [SerializeField] private NetworkManager networkManager;
    [System.Obsolete("This method is obsolete. Use StartGame() in NetworkManager instead.")]
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

### NetworkInputData.cs
```csharp
using Fusion;
using UnityEngine;

public struct NetworkInputData : INetworkInput
{
    public Vector2 movement; // Di chuyển
    public bool jump;        // Nhảy
    public bool attack;      // Tấn công
}
```

### PlayerSpawner.cs
```csharp
using UnityEngine;
using UnityEngine.InputSystem;
using Fusion;
using Fusion.Sockets;
using System.Collections.Generic;

public class PlayerSpawner : MonoBehaviour, INetworkRunnerCallbacks
{
    [SerializeField] private NetworkPrefabRef playerPrefab;
    [SerializeField] InputSystem_Actions inputActions;
    private Dictionary<PlayerRef, NetworkObject> spawnedCharacters = new Dictionary<PlayerRef, NetworkObject>();
  
    void Start()
    {
        inputActions = new InputSystem_Actions();
        inputActions.Enable();
    }

    public void OnInput(NetworkRunner runner, NetworkInput input)
    {
        var inputData = new NetworkInputData
        {
            movement = inputActions.Player.Move.ReadValue<Vector2>(),
            jump = inputActions.Player.Jump.triggered,
            attack = inputActions.Player.Attack.triggered
        };
        input.Set(inputData);
    }

    public void OnPlayerJoined(NetworkRunner runner, PlayerRef player)
    {
        if (runner.IsServer) // chỉ server/host spawn
        {
            Debug.Log($"Player {player} joined. Spawning character...");
            Vector2 spawnPosition = new Vector2((player.RawEncoded % runner.Config.Simulation.PlayerCount) * 3, 10);
            var playerObject = runner.Spawn(playerPrefab, spawnPosition, Quaternion.identity, player);
            Debug.Log($"Spawned for PlayerRef: {player} - InputAuthority: {playerObject.InputAuthority}");
        }
        else
        {
            Debug.Log($"Player {player} joined but not spawning character as client.");
        }
    }

    public void OnPlayerLeft(NetworkRunner runner, PlayerRef player)
    {
        if (spawnedCharacters.TryGetValue(player, out NetworkObject playerObject))
        {
            runner.Despawn(playerObject);
            spawnedCharacters.Remove(player);
        }
    }

    // Các callback khác giữ nguyên như cũ...
    public void OnShutdown(NetworkRunner runner, ShutdownReason shutdownReason) { }
    public void OnConnectedToServer(NetworkRunner runner) { }
    public void OnDisconnectedFromServer(NetworkRunner runner, NetDisconnectReason reason) { }
    public void OnConnectRequest(NetworkRunner runner, NetworkRunnerCallbackArgs.ConnectRequest request, byte[] token) { }
    public void OnConnectFailed(NetworkRunner runner, NetAddress remoteAddress, NetConnectFailedReason reason)
    {
        Debug.LogError($"Connect failed to {remoteAddress}: {reason}");
    }
    public void OnUserSimulationMessage(NetworkRunner runner, SimulationMessagePtr message) { }
    public void OnReliableDataReceived(NetworkRunner runner, PlayerRef player, ReliableKey key, System.ArraySegment<byte> data) { }
    public void OnReliableDataProgress(NetworkRunner runner, PlayerRef player, ReliableKey key, float progress) { }
    public void OnInputMissing(NetworkRunner runner, PlayerRef player, NetworkInput input) { }
    public void OnSessionListUpdated(NetworkRunner runner, List<SessionInfo> sessionList) { }
    public void OnCustomAuthenticationResponse(NetworkRunner runner, Dictionary<string, object> data) { }
    public void OnHostMigration(NetworkRunner runner, HostMigrationToken hostMigrationToken) { }
    public void OnSceneLoadDone(NetworkRunner runner) { }
    public void OnSceneLoadStart(NetworkRunner runner) { }
    public void OnObjectEnterAOI(NetworkRunner runner, NetworkObject obj, PlayerRef player) { }
    public void OnObjectExitAOI(NetworkRunner runner, NetworkObject obj, PlayerRef player) { }
}
```
<hr>
<h2>4. Kết Luận</h2>
<p>Trong bài viết này, chúng ta đã tìm hiểu cách cấu hình Photon Fusion cho Host Mode trong Unity. Bằng cách sử dụng Host Mode, bạn có thể đơn giản hóa việc triển khai mạng cho các trò chơi đa người chơi nhỏ mà không cần máy chủ trung tâm.</p>

<hr>
<h2>5. Tổ Chức Thư Mục</h2>
<p>Sắp xếp dự án của bạn như sau:</p>
<pre>
/PhotonHostMode
  NetworkManager.cs
  CustomGameManager.cs
  NetworkInputData.cs
  PlayerSpawner.cs
</pre>
<hr>
<h2>6. Hướng Dẫn Chạy</h2>
<ol>
  <li>Thêm <code>CustomGameManager</code> vào một GameObject trong Scene chính.</li>
  <li>Chạy game trong Unity Editor.
    <ul>
      <li>Nếu cấu hình đúng, Photon Fusion sẽ tạo một phòng với tên <b>RoomTest</b>.</li>
      <li>Các client khác có thể kết nối với host thông qua App ID của bạn.</li>
    </ul>
  </li>
</ol>
<hr>
<h2>7. Mở Rộng</h2>
<ul>
  <li><b>Tạo UI:</b> Thêm giao diện để người chơi nhập tên phòng hoặc chọn vai trò (host/client).</li>
  <li><b>Xử lý ngắt kết nối:</b> Thêm logic để xử lý khi host thoát hoặc client bị mất kết nối.</li>
  <li><b>Đồng bộ dữ liệu:</b> Sử dụng <code>[Networked]</code> để đồng bộ biến hoặc trạng thái giữa các client.</li>
</ul>
<hr>
<h2>8. Tham Khảo</h2>
<ul>
  <li><a href="https://doc.photonengine.com/fusion" target="_blank">Photon Fusion Documentation</a></li>
  <li><a href="https://dashboard.photonengine.com" target="_blank">Photon Dashboard</a></li>
  <li><a href="https://unity.com/learn" target="_blank">Unity Integration Guide</a></li>
</ul>
<h3><b>Tác giả</b></h3>
<p><b>Pesinus</b><br>
Liên hệ: <a href="mailto:nguyenmanh2004devgame@gmail.com">nguyenmanh2004devgame@gmail.com</a></p>
