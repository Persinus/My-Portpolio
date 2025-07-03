export default {
  id: 4,
  title: 'Bài 4: RPC trong Photon Fusion',
  cover: 'https://i.pinimg.com/originals/89/c4/1b/89c41b5719cee78af952def438761e11.gif',
  author: 'Nguyễn Văn Mạnh',
  authorAvatar: 'https://avatars.githubusercontent.com/u/199482290?v=4',
  date: '10/02/2025 8:00 SA',
  topic: 'Networking',
  toc: [
    'RPC là gì',
    'Các thành phần chính của RPC',
    'Ví dụ mã sử dụng RPC',
    'Chức năng của các RPC trong script',
    'Gợi ý mở rộng'
  ],
  warning: '',
  barge: ['Photon Fusion', 'RPC', 'Unity'],
  content: `
<hr>
<h2>RPC (Remote Procedure Call)</h2>
<p>RPC là một tính năng trong Photon Fusion cho phép gọi các phương thức từ xa giữa các client hoặc server, giúp đồng bộ hóa hành động và sự kiện trong game.</p>
<hr>
<h2>Các thành phần chính của RPC</h2>
<ol>
  <li><b>RpcSources</b>:<br>
    <span>- Xác định nguồn gốc của lời gọi (client, server, hoặc authority cụ thể).</span>
  </li>
  <li><b>RpcTargets</b>:<br>
    <span>- Xác định đích đến của lời gọi (một client, tất cả client, hoặc server).</span>
  </li>
</ol>
<hr>
<h2>Ví dụ mã sử dụng RPC</h2>
<p>Dưới đây là ví dụ về cách sử dụng RPC để thực hiện các hành động trong game:</p>
`,
  code: [
    {
      file: 'RPCExample.cs',
      lang: 'csharp',
      value: `using Fusion;
using UnityEngine;

public class RPCExample : NetworkBehaviour
{
    // RPC dùng để gửi tin nhắn
    [Rpc(RpcSources.InputAuthority, RpcTargets.All)]
    public void RPC_SendMessage(string message)
    {
        Debug.Log($"Message received: {message}");
    }

    // RPC dùng để phát hiệu ứng âm thanh
    [Rpc(RpcSources.InputAuthority, RpcTargets.All)]
    public void RPC_PlaySound(Vector3 position)
    {
        Debug.Log($"Play sound at position: {position}");
        // Thêm logic phát âm thanh tại vị trí
    }

    // RPC dùng để yêu cầu mua vật phẩm
    [Rpc(RpcSources.InputAuthority, RpcTargets.StateAuthority)]
    public void RPC_BuyItem(string itemName)
    {
        Debug.Log($"Request to buy: {itemName}");
        // Logic xử lý mua vật phẩm tại server
    }

    // RPC thông báo bắt đầu trận đấu
    [Rpc(RpcSources.StateAuthority, RpcTargets.All)]
    public void RPC_StartGame()
    {
        Debug.Log("Game has started!");
        // Logic bắt đầu trận đấu
    }

    private void Update()
    {
        // Gửi tin nhắn khi nhấn T
        if (Input.GetKeyDown(KeyCode.T) && Object.HasInputAuthority)
        {
            RPC_SendMessage("Hello from player!");
        }

        // Phát âm thanh khi nhấn G
        if (Input.GetKeyDown(KeyCode.G) && Object.HasInputAuthority)
        {
            RPC_PlaySound(transform.position);
        }

        // Gửi yêu cầu mua vật phẩm khi nhấn B
        if (Input.GetKeyDown(KeyCode.B) && Object.HasInputAuthority)
        {
            RPC_BuyItem("Sword");
        }

        // Bắt đầu trận đấu khi nhấn S (chỉ host)
        if (Input.GetKeyDown(KeyCode.S) && Object.HasStateAuthority)
        {
            RPC_StartGame();
        }
    }
}`
    }
  ],
  content2: `
<hr>
<h2>Chức năng của các RPC trong script</h2>
<h3>1. Gửi tin nhắn (<code>RPC_SendMessage</code>)</h3>
<ul>
  <li><b>Mô tả:</b> Gửi tin nhắn từ một client tới tất cả các client khác.</li>
  <li><b>Kích hoạt:</b> Khi nhấn phím <code>T</code>.</li>
  <li><b>Ứng dụng:</b> Gửi thông báo, trò chuyện trong game, hoặc các thông điệp chung.</li>
</ul>
<h3>2. Phát âm thanh (<code>RPC_PlaySound</code>)</h3>
<ul>
  <li><b>Mô tả:</b> Gửi yêu cầu phát âm thanh tại một vị trí cụ thể tới tất cả client.</li>
  <li><b>Kích hoạt:</b> Khi nhấn phím <code>G</code>.</li>
  <li><b>Ứng dụng:</b> Phát hiệu ứng âm thanh như bước chân, tiếng súng, hoặc thông báo trạng thái trong game.</li>
</ul>
<h3>3. Yêu cầu mua vật phẩm (<code>RPC_BuyItem</code>)</h3>
<ul>
  <li><b>Mô tả:</b> Gửi yêu cầu mua vật phẩm từ client tới server để xử lý.</li>
  <li><b>Kích hoạt:</b> Khi nhấn phím <code>B</code>.</li>
  <li><b>Ứng dụng:</b> Xử lý các giao dịch mua bán vật phẩm trong trò chơi, chỉ được thực hiện bởi server.</li>
</ul>
<h3>4. Bắt đầu trận đấu (<code>RPC_StartGame</code>)</h3>
<ul>
  <li><b>Mô tả:</b> Server gửi thông báo bắt đầu trận đấu tới tất cả client.</li>
  <li><b>Kích hoạt:</b> Khi nhấn phím <code>S</code> (chỉ dành cho host).</li>
  <li><b>Ứng dụng:</b> Đồng bộ hóa trạng thái bắt đầu trận đấu giữa các client trong game.</li>
</ul>
<hr>
<h2>Gợi ý mở rộng</h2>
<p>Các bạn có thể mở rộng ví dụ này với những ý tưởng sau:</p>
<ul>
  <li>Thêm các RPC mới cho các hành động khác nhau trong game như nhảy, chạy, hoặc tương tác với vật phẩm.</li>
  <li>Sử dụng các tham số phức tạp hơn trong RPC, chẳng hạn như truyền tải trạng thái của một đối tượng.</li>
  <li>Kết hợp với các hệ thống khác trong game như hệ thống vật phẩm, hệ thống điểm số, hoặc hệ thống nhiệm vụ.</li>
</ul>
<p>Chúc các bạn lập trình vui vẻ và sáng tạo!</p>
`
}