export default {
  id: 7,
  title: '📦 AssetBundle trong Unity: Quản Lý & Tối Ưu Tài Sản Game',
  cover: 'https://i.pinimg.com/originals/ab/90/cd/ab90cd665a40678eb76c3b80a2d5a83f.gif',
  author: 'Nguyễn Văn Mạnh',
  authorAvatar: 'https://avatars.githubusercontent.com/u/199482290?v=4',
  date: '13/07/2025 8:00 SA',
  topic: 'Unity, AssetBundle, Game Asset',
  toc: [
    '1. AssetBundle là gì?',
    '2. Tại sao nên dùng AssetBundle?',
    '3. Cài đặt AssetBundle Browser',
    '4. Cách đóng gói AssetBundle',
    '5. Các tuỳ chọn khi Build',
    '6. Vị trí lưu AssetBundle',
    '7. Lưu ý khi dùng',
    '8. Ví dụ code',
    '9. API thường dùng',
    'Tài liệu tham khảo',
    'Đóng góp',
    'Liên hệ'
  ],
  warning: '',
  barge: ['Unity', 'AssetBundle', 'Game Asset', 'StreamingAssets'],
  content: `
<h1>📦 AssetBundle trong Unity: Quản Lý & Tối Ưu Tài Sản Game</h1>
<hr>
<h2>1. AssetBundle là gì?</h2>
<blockquote>
  <b>AssetBundle</b> là tính năng của Unity cho phép đóng gói và phân phối các tài sản (assets) như hình ảnh, âm thanh, prefab, model 3D... thành file <code>.assetbundle</code>.  
  Hỗ trợ tải tài sản theo yêu cầu, giúp tối ưu hiệu suất và giảm kích thước ứng dụng.
</blockquote>
<hr>
<h2>2. Tại sao nên sử dụng AssetBundle?</h2>
<ul>
  <li><b>🎯 Tối ưu hiệu suất:</b> Chỉ tải khi cần, giảm thời gian khởi động, tiết kiệm RAM</li>
  <li><b>🗂 Quản lý tài sản hiệu quả:</b> Nhóm asset cùng loại, phân chia dễ bảo trì</li>
  <li><b>🔁 Cập nhật linh hoạt:</b> Chỉ cần cập nhật bundle, không phải rebuild toàn bộ app</li>
  <li><b>🌐 Hỗ trợ tải từ xa:</b> Có thể lưu trên server và tải về khi cần</li>
  <li><b>🔃 Dùng lại giữa nhiều dự án:</b> Tạo thư viện asset dùng chung</li>
  <li><b>🧩 Quản lý phiên bản:</b> Dễ version hóa bằng cách thêm hash vào tên</li>
</ul>
<hr>
<h2>3. Cài đặt AssetBundle Browser</h2>
<p>Dùng để quản lý và build các asset bundle.</p>
<p><b>Link tải:</b> <a href="https://github.com/Unity-Technologies/AssetBundles-Browser.git" target="_blank">AssetBundle Browser</a></p>
<ol>
  <li>Clone hoặc import qua Unity Package Manager</li>
  <li>Mở <b>Window → AssetBundle Browser</b></li>
</ol>
<hr>
<h2>4. Cách đóng gói AssetBundle</h2>
<ul>
  <li><b>Bước 1:</b> Gán tên bundle trong <b>Inspector</b> của asset (trường <code>AssetBundle</code>)</li>
  <li><b>Bước 2:</b> Mở AssetBundle Browser, chuyển tab <b>Build</b> và bấm <b>Build</b></li>
</ul>
<p>
  <img src="https://github.com/user-attachments/assets/111ac45d-709e-4884-9a56-cb739ab05cf8" alt="AssetBundle Browser" width="80%" />
</p>
<hr>
<h2>5. Các tuỳ chọn khi Build</h2>
<ul>
  <li><b>Standard Compression (LZMA):</b> Nén tốt, load chậm hơn</li>
  <li><b>LZ4:</b> Nén nhẹ, load nhanh</li>
  <li><b>Uncompressed:</b> Không nén, file lớn</li>
  <li><b>Exclude Type Information:</b> Không chứa thông tin kiểu, nhẹ hơn</li>
  <li><b>Force Rebuild:</b> Bắt buộc build lại toàn bộ</li>
  <li><b>Ignore Type Tree Changes:</b> Bỏ qua thay đổi kiểu asset</li>
  <li><b>Append Hash:</b> Gắn hash vào tên file để quản lý version</li>
  <li><b>Strict Mode:</b> Kiểm tra chặt chẽ, cảnh báo lỗi nếu có</li>
  <li><b>Dry Run Build:</b> Chỉ kiểm tra cấu hình, không build thật</li>
</ul>
<hr>
<h2>6. Vị trí lưu AssetBundle</h2>
<p>Kết quả build nên lưu trong thư mục <code>Assets/StreamingAssets/</code> để dễ load khi chạy game.</p>
<hr>
<h2>7. Lưu ý khi dùng</h2>
<ul>
  <li>Các thư mục có tệp con phụ thuộc phải đóng gói kèm các phụ thuộc đó vào bundle.</li>
  <li>Tên bundle là tên thư mục đầu tiên trong 4 cấp (nếu có nhiều thư mục lồng nhau).</li>
</ul>
<p>
  <img src="https://github.com/user-attachments/assets/1fd5ee8a-0011-4e84-8706-6b9aa20499bd" alt="Cấu trúc bundle" width="40%" />
</p>
<hr>
<h2>8. Ví dụ code load Asset từ AssetBundle</h2>
<p><i>Xem code ở cuối bài</i></p>
<p>
  <img src="https://github.com/user-attachments/assets/e770c9c8-beb6-4f05-ba85-3dcfe2037040" alt="Demo load AssetBundle" width="80%" />
</p>
<hr>
<h2>9. 🛠️ Các hàm và phương thức thường dùng trong AssetBundle</h2>
<ul>
  <li><b>🎯 Nhóm tải AssetBundle:</b>
    <ul>
      <li><code>AssetBundle.LoadFromFile(path)</code>: Tải từ file local</li>
      <li><code>AssetBundle.LoadFromMemory(byte[])</code>: Tải từ mảng byte</li>
      <li><code>AssetBundle.LoadFromStream(Stream)</code>: Tải từ stream</li>
    </ul>
  </li>
  <li><b>📦 Nhóm load asset từ AssetBundle:</b>
    <ul>
      <li><code>LoadAsset&lt;T&gt;("assetName")</code>: Load asset kiểu cụ thể</li>
      <li><code>LoadAllAssets&lt;T&gt;()</code>: Load tất cả asset kiểu T</li>
      <li><code>LoadAllAssets()</code>: Load toàn bộ asset</li>
      <li><code>LoadAssetAsync&lt;T&gt;("assetName")</code>: Load asset bất đồng bộ</li>
      <li><code>LoadAllAssetsAsync&lt;T&gt;()</code>: Load tất cả asset kiểu T async</li>
    </ul>
  </li>
  <li><b>🧼 Nhóm giải phóng bộ nhớ:</b>
    <ul>
      <li><code>assetBundle.Unload(bool unloadAllLoadedObjects)</code>: Giải phóng AssetBundle khỏi bộ nhớ</li>
    </ul>
  </li>
  <li><b>🌐 Nhóm tải AssetBundle từ mạng:</b>
    <ul>
      <li>Dùng <code>UnityWebRequestAssetBundle</code> để tải bundle từ server</li>
    </ul>
  </li>
  <li><b>🧪 Nhóm kiểm tra & tiện ích:</b>
    <ul>
      <li><code>Contains("assetName")</code>: Kiểm tra bundle có asset không</li>
      <li><code>GetAllAssetNames()</code>: Lấy danh sách asset</li>
      <li><code>GetAllScenePaths()</code>: Lấy danh sách scene</li>
    </ul>
  </li>
</ul>
<hr>
<h2>Tài liệu tham khảo</h2>
<ul>
  <li><a href="https://docs.unity3d.com/Manual/AssetBundlesIntro.html" target="_blank">Unity Manual: AssetBundles</a></li>
  <li><a href="https://github.com/Unity-Technologies/AssetBundles-Browser" target="_blank">AssetBundle Browser Tool</a></li>
  <li><a href="https://docs.unity3d.com/ScriptReference/AssetBundle.html" target="_blank">Unity AssetBundle API</a></li>
</ul>
<hr>
<h2>Đóng góp</h2>
<p>Nếu bạn muốn đóng góp vào bài viết này, hãy tạo pull request hoặc issue trên GitHub. Mọi ý kiến đóng góp đều được hoan nghênh!</p>
<hr>
<h2>Liên hệ</h2>
<p>Nếu bạn có bất kỳ câu hỏi nào, hãy để lại comment hoặc gửi email cho tôi qua địa chỉ: <a href="mailto:nguyenmanh2004devgame@gmail.com">nguyenmanh2004devgame@gmail.com</a></p>
<p>Cảm ơn bạn đã đọc! Nếu thấy hữu ích, hãy chia sẻ với bạn bè và đồng nghiệp nhé! 😊</p>
`,
  code: [
    {
      file: 'Assetbundle.cs',
      lang: 'csharp',
      value: `using UnityEngine;
using System.IO;

public class Assetbundle : MonoBehaviour
{
    [Header("Tên file bundle (không có đuôi .bundle)")]
    public string assetBundleName; // VD: "character"
    
    [Header("Tên prefab trong bundle")]
    public string prefabName;      // VD: "Monster_1_Salamander"

    private AssetBundle assetBundle;
    private GameObject instance;

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.L))
        {
            LoadAndInstantiatePrefab();
        }

        if (Input.GetKeyDown(KeyCode.R))
        {
            if (instance != null)
            {
                Destroy(instance);
                Debug.Log("♻️ Đã huỷ đối tượng hiện tại");
            }
        }
    }

    private void LoadAndInstantiatePrefab()
    {
        // Nếu bundle đã load → Unload lại
        if (assetBundle != null)
        {
            Debug.LogWarning("AssetBundle đã được load trước đó. Đang Unload...");
            assetBundle.Unload(false);
            Debug.Log("✅ Đã Unload AssetBundle cũ");
            if (instance != null)
            {
                Destroy(instance);
                Debug.Log("♻️ Đã huỷ đối tượng hiện tại");
            }
        }
    }
}
`}
]   
};
