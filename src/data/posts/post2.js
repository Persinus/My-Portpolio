export default {
  id: 2,
  title: 'Bài 2: Xây Dựng Hệ Thống Người Chơi Trong Photon Fusion Với Spine Pro Và InputSystem',
  cover: 'https://i.pinimg.com/originals/48/4b/32/484b325cdb5bdd8bce6d8e3d131fda75.gif',
  author: 'Nguyễn Văn Mạnh',
  authorAvatar: 'https://avatars.githubusercontent.com/u/199482290?v=4',
  date: '10/01/2025 8:00 SA',
  topic: 'Networking',
  toc: [
    'Mục Tiêu',
    'Tích Hợp Fusion Physics Addon',
    'Thành Phần Bắt Buộc Trong Fusion Physics',
    'Định Nghĩa Các Thành Phần Của INetworkRunnerCallbacks',
    'Hướng Dẫn Triển Khai',
    'Kết Quả',
    'Bài Tập Mở Rộng'
  ],
  warning: '',
  barge: ['Photon Fusion', 'Spine Pro', 'InputSystem', 'Unity'],
  content: `
<h1>Xây Dựng Hệ Thống Người Chơi Trong Photon Fusion Với Spine Pro Và InputSystem</h1>
<hr>
<h2><b>1. Mục Tiêu</b></h2>
<ul>
  <li>Hiểu cách xây dựng hệ thống người chơi với <b>Photon Fusion</b>.</li>
  <li>Tích hợp <b>InputSystem</b> để thu thập và áp dụng đầu vào.</li>
  <li>Đồng bộ hóa chuyển động và hoạt ảnh từ <b>Spine Pro</b> giữa các client.</li>
  <li>Tích hợp và sử dụng <b>Fusion Physics Addon</b> để quản lý đồng bộ hóa vật lý.</li>
</ul>
<hr>
<h2><b>2. Tích Hợp Fusion Physics Addon</b></h2>
<h3><b>2.1. Yêu Cầu Hệ Thống</b></h3>
<ul>
  <li><b>Unity Version:</b> Unity 2021.3 hoặc cao hơn.</li>
  <li><b>Photon Fusion AppId:</b>
    <ul>
      <li>Tạo AppId từ <a href="https://dashboard.photonengine.com" target="_blank">Photon Dashboard</a>.</li>
      <li>Dán AppId vào <b>App Id Fusion</b> trong <b>Real Time Settings</b> (menu Fusion trong Unity).</li>
    </ul>
  </li>
</ul>
<hr>
<h3><b>2.2. Tải Addon</b></h3>
<table>
  <thead>
    <tr>
      <th>Phiên Bản</th>
      <th>Ngày Phát Hành</th>
      <th>Liên Kết Tải</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>2.0.3</b></td>
      <td>Mar 03, 2025</td>
      <td><a href="https://doc.photonengine.com/fusion/current/addons/physics/download" target="_blank">Tải Fusion Physics 2.0.3</a></td>
    </tr>
    <tr>
      <td><b>2.0.2</b></td>
      <td></td>
      <td><a href="https://doc.photonengine.com/fusion/current/addons/physics/download" target="_blank">Tải Fusion Physics 2.0.2</a></td>
    </tr>
    <tr>
      <td><b>2.0.1</b></td>
      <td></td>
      <td><a href="https://doc.photonengine.com/fusion/current/addons/physics/download" target="_blank">Tải Fusion Physics 2.0.1</a></td>
    </tr>
  </tbody>
</table>
<hr>
<h3><b>2.3. Cài Đặt Addon</b></h3>
<h4><b>Bước 1: Xóa Bản Addon Cũ (Nếu Có)</b></h4>
<ol>
  <li>Truy cập thư mục: <b>Assets &gt; Photon &gt; FusionAddons &gt; Physics</b>.</li>
  <li>Xóa toàn bộ thư mục <b>Physics</b>.</li>
</ol>
<h4><b>Bước 2: Nhập Addon Mới</b></h4>
<ol>
  <li>Tải tệp <code>.unitypackage</code> của phiên bản mới.</li>
  <li>Kéo tệp <code>.unitypackage</code> vào cửa sổ <b>Project</b> trong Unity.</li>
  <li>Nhấn <b>Import</b> và đảm bảo tất cả các tệp được chọn.</li>
</ol>
<hr>
<h2><b>3. Thành Phần Bắt Buộc Trong Fusion Physics</b></h2>
<table>
  <thead>
    <tr>
      <th>Thành Phần</th>
      <th>Mục Đích</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>NetworkRigidbody2D/3D</b></td>
      <td>Đồng bộ trạng thái vật lý của Rigidbody (2D/3D) giữa các client.</td>
    </tr>
    <tr>
      <td><b>BoxCollider2D/3D</b></td>
      <td>Phát hiện va chạm cho các đối tượng vật lý.</td>
    </tr>
    <tr>
      <td><b>NetworkObject</b></td>
      <td>Quản lý các đối tượng trên mạng, cho phép đồng bộ trạng thái.</td>
    </tr>
  </tbody>
</table>
<hr>
<h2><b>4. Định Nghĩa Các Thành Phần Của <code>INetworkRunnerCallbacks</code></b></h2>
<table>
  <thead>
    <tr>
      <th>Hàm Bắt Buộc</th>
      <th>Định Nghĩa</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>OnPlayerJoined</code></td>
      <td>Được gọi khi người chơi tham gia phòng. Spawn nhân vật cho người chơi này.</td>
    </tr>
    <tr>
      <td><code>OnPlayerLeft</code></td>
      <td>Được gọi khi người chơi rời phòng. Xóa các tài nguyên liên quan.</td>
    </tr>
    <tr>
      <td><code>OnInput</code></td>
      <td>Thu thập đầu vào từ <code>InputSystem</code> và gửi lên máy chủ.</td>
    </tr>
    <tr>
      <td><code>OnInputMissing</code></td>
      <td>Được gọi khi thiếu đầu vào từ một người chơi.</td>
    </tr>
    <tr>
      <td><code>OnShutdown</code></td>
      <td>Được gọi khi <code>NetworkRunner</code> dừng hoạt động. Dọn dẹp tài nguyên.</td>
    </tr>
    <tr>
      <td><code>OnConnectedToServer</code></td>
      <td>Xác nhận kết nối thành công đến máy chủ.</td>
    </tr>
    <tr>
      <td><code>OnDisconnectedFromServer</code></td>
      <td>Được gọi khi mất kết nối với máy chủ.</td>
    </tr>
    <tr>
      <td><code>OnConnectRequest</code></td>
      <td>Xử lý yêu cầu kết nối từ một client khác.</td>
    </tr>
    <tr>
      <td><code>OnConnectFailed</code></td>
      <td>Được gọi khi kết nối với máy chủ thất bại.</td>
    </tr>
    <tr>
      <td><code>OnReliableDataReceived</code></td>
      <td>Nhận dữ liệu đáng tin cậy từ người chơi khác.</td>
    </tr>
    <tr>
      <td><code>OnReliableDataProgress</code></td>
      <td>Xử lý tiến trình gửi dữ liệu đáng tin cậy.</td>
    </tr>
    <tr>
      <td><code>OnUserSimulationMessage</code></td>
      <td>Xử lý tin nhắn mô phỏng do người dùng định nghĩa.</td>
    </tr>
    <tr>
      <td><code>OnSessionListUpdated</code></td>
      <td>Được gọi khi danh sách session được cập nhật.</td>
    </tr>
    <tr>
      <td><code>OnCustomAuthenticationResponse</code></td>
      <td>Xử lý phản hồi xác thực tùy chỉnh từ máy chủ.</td>
    </tr>
    <tr>
      <td><code>OnHostMigration</code></td>
      <td>Xử lý khi host bị thay đổi (Host Migration).</td>
    </tr>
    <tr>
      <td><code>OnSceneLoadStart</code></td>
      <td>Được gọi khi một cảnh mới bắt đầu tải.</td>
    </tr>
    <tr>
      <td><code>OnSceneLoadDone</code></td>
      <td>Được gọi khi cảnh mới đã tải xong.</td>
    </tr>
    <tr>
      <td><code>OnObjectEnterAOI</code></td>
      <td>Được gọi khi một đối tượng xuất hiện trong vùng quan tâm của người chơi (AOI - Area of Interest).</td>
    </tr>
    <tr>
      <td><code>OnObjectExitAOI</code></td>
      <td>Được gọi khi một đối tượng rời khỏi vùng quan tâm của người chơi.</td>
    </tr>
  </tbody>
</table>
<hr>
<h2><b>5. Hướng Dẫn Triển Khai</b></h2>
<ol>
  <li><b>Tạo Prefab Nhân Vật:</b>
    <ul>
      <li>Thêm các thành phần: <code>NetworkObject</code>, <code>NetworkRigidbody2D</code>, <code>BoxCollider2D</code>.</li>
      <li>Gán script <code>PlayerController</code> để điều khiển logic nhân vật.</li>
    </ul>
  </li>
  <li><b>Cấu Hình Vật Lý Trong <code>PlayerController</code>:</b>
    <ul>
      <li>Thêm <code>NetworkRigidbody2D</code> để đồng bộ hóa trạng thái vật lý của nhân vật.</li>
      <li>Sử dụng <code>BoxCollider2D</code> để phát hiện va chạm.</li>
    </ul>
  </li>
  <li><b>Thu Thập Đầu Vào Với <code>InputSystem</code>:</b>
    <ul>
      <li>Cấu hình hành động di chuyển, nhảy và tấn công trong <code>InputSystem</code>.</li>
    </ul>
  </li>
</ol>
<hr>
<h2><b>6. Kết Quả</b></h2>
<ul>
  <li>Khi người chơi tham gia, nhân vật được spawn và đồng bộ hóa trạng thái vật lý qua mạng.</li>
  <li>Input từ người chơi được thu thập và đồng bộ hóa qua mạng.</li>
  <li>Vật lý và hoạt ảnh nhân vật được đồng bộ mượt mà giữa các client.</li>
</ul>
<img src="https://github.com/user-attachments/assets/5e23a4c1-dd3f-479d-84c8-0ea543a45290" alt="Fusion Physics Result" style="margin: 1em 0; border-radius: 8px; max-width: 100%;">
<hr>
<h2><b>7. Bài Tập Mở Rộng</b></h2>
<ul>
  <li><b>Tích hợp hiệu ứng vật lý:</b> Thêm hiệu ứng như lực va chạm hoặc mô phỏng trọng lực.</li>
  <li><b>Tối ưu vật lý:</b> Sử dụng cấu hình vật lý để giảm độ trễ và cải thiện hiệu suất.</li>
  <li><b>Kết hợp Unity Physics:</b> Kết hợp Unity Physics với Fusion Physics để mở rộng khả năng mô phỏng.</li>
</ul>
<hr>
<p>Chúc bạn triển khai thành công! 🚀</p>
`

}