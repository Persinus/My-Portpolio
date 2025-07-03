export default {
  id: 5,
  title: '☁️ Hướng Dẫn Sử Dụng Cloudinary Trong ASP.NET',
  cover: 'https://i.pinimg.com/736x/c9/7c/ee/c97cee6cb8c472b1e3b01c66278f4195.jpg',
  author: 'Nguyễn Văn Mạnh',
  authorAvatar: 'https://avatars.githubusercontent.com/u/199482290?v=4',
  date: '11/07/2025 8:00 SA',
  topic: 'Cloud, ASP.NET',
  toc: [
    'Cloudinary là gì?',
    'Lấy thông tin tài khoản',
    'Cấu hình appsettings.json',
    'Cài đặt Cloudinary SDK',
    'Tạo dịch vụ Cloudinary',
    'Đăng ký dịch vụ trong Program.cs',
    'Cách sử dụng trong Controller',
    'Hình ảnh kết quả',
    'Tài liệu tham khảo',
    'Đóng góp',
    'Liên hệ'
  ],
  warning: '',
  barge: ['Cloudinary', 'ASP.NET', 'Cloud', 'Image Upload'],
  content: `
<h1>☁️ Hướng Dẫn Sử Dụng Cloudinary Trong ASP.NET</h1>
<hr>
<h2>🔰 Cloudinary là gì?</h2>
<blockquote>
  <a href="https://cloudinary.com" target="_blank"><b>Cloudinary</b></a> là dịch vụ lưu trữ <b>hình ảnh và video trên đám mây</b>, hỗ trợ upload, resize, tối ưu hóa, chuyển đổi định dạng và phân phối qua CDN.
</blockquote>
<h3>📌 Tại sao nên dùng Cloudinary?</h3>
<ul>
  <li><b>☁️ Lưu trữ cloud:</b> Không cần host riêng hình/video</li>
  <li><b>⚡ CDN tốc độ cao:</b> Phân phối nội dung toàn cầu nhanh chóng</li>
  <li><b>🛠 Xử lý ảnh qua URL:</b> Resize, crop, đổi định dạng... chỉ qua URL</li>
  <li><b>📸 Hỗ trợ nhiều định dạng:</b> JPG, PNG, MP4, WebP, GIF, HEIC...</li>
  <li><b>🔐 Bảo mật:</b> Chia quyền truy cập nội dung</li>
  <li><b>🚀 Tích hợp dễ dàng:</b> Hỗ trợ nhiều nền tảng: .NET, Node.js, React,...</li>
</ul>
<hr>
<h2>🔑 Lấy thông tin tài khoản Cloudinary</h2>
<ol>
  <li>Truy cập <a href="https://cloudinary.com/console" target="_blank">Cloudinary Dashboard</a></li>
  <li>Copy 3 thông tin sau:
    <ul>
      <li><code>CloudName</code></li>
      <li><code>API Key</code></li>
      <li><code>API Secret</code></li>
    </ul>
  </li>
</ol>
<hr>
<h2>⚙️ Cấu hình <code>appsettings.json</code></h2>
<p><i>Xem code ở cuối bài</i></p>
<hr>
<h2>📦 Cài đặt Cloudinary SDK</h2>
<p><i>Xem code ở cuối bài</i></p>
<hr>
<h2>🛠 Tạo dịch vụ Cloudinary</h2>
<p><i>Xem code ở cuối bài</i></p>
<hr>
<h2>Đăng ký dịch vụ Cloudinary trong <code>Program.cs</code></h2>
<p><i>Xem code ở cuối bài</i></p>
<hr>
<h2>Cách sử dụng Cloudinary trong Controller</h2>
<ul>
  <li>Clone repository này về máy và mở trong Visual Studio hoặc IDE bạn thích.</li>
  <li>Sửa đổi <code>appsettings.json</code> với thông tin tài khoản Cloudinary của bạn.</li>
  <li>Chạy ứng dụng và truy cập vào API để upload ảnh/video và nhớ thêm <b>/swagger</b> vào cuối URL để xem tài liệu API.</li>
</ul>
<p>
  <b>Xem source tại:</b>
  <a href="https://github.com/EduHub-LHU/Cloudinary.NET" target="_blank">https://github.com/EduHub-LHU/Cloudinary.NET</a>
</p>
<p>
  Các hình ảnh đã upload lên Cloudinary sẽ được lưu trong thư mục <code>wwwroot/images</code> trong project.<br>
  Khi bạn upload ảnh, nó sẽ tự động lưu vào Cloudinary và trả về URL của ảnh đã upload.
</p>
<hr>
<h2>📸 Hình ảnh kết quả</h2>
<p align="center" style="display:flex;gap:8px;justify-content:center;">
  <img src="https://github.com/EduHub-LHU/Cloudinary.NET/blob/main/uploadImage.png?raw=true" alt="upload ảnh" width="48%" />
  <img src="https://github.com/EduHub-LHU/Cloudinary.NET/blob/main/ImageSuccessful.png?raw=true" alt="kết quả upload ảnh" width="48%" />
</p>
<p align="center" style="display:flex;gap:8px;justify-content:center;">
  <img src="https://github.com/EduHub-LHU/Cloudinary.NET/blob/main/UploadVideo.png?raw=true" alt="upload video" width="48%" />
  <img src="https://github.com/EduHub-LHU/Cloudinary.NET/blob/main/VideoSuccessful.png?raw=true" alt="kết quả upload video" width="48%" />
</p>
<hr>
<h2>Tài liệu tham khảo</h2>
<ul>
  <li><a href="https://cloudinary.com/documentation" target="_blank">Cloudinary Documentation</a></li>
  <li><a href="https://cloudinary.com/documentation/dotnet_integration" target="_blank">Cloudinary .NET SDK</a></li>
  <li><a href="https://cloudinary.com/documentation/image_upload_api_reference" target="_blank">Cloudinary API Reference</a></li>
  <li><a href="https://github.com/cloudinary/cloudinary_dotnet" target="_blank">Cloudinary .NET SDK GitHub</a></li>
  <li><a href="https://docs.microsoft.com/en-us/aspnet/core/" target="_blank">ASP.NET Core Documentation</a></li>
</ul>
<hr>
<h2>Đóng góp</h2>
<p>Nếu bạn muốn đóng góp vào dự án này, hãy tạo một pull request hoặc issue trên GitHub. Mọi ý kiến đóng góp đều được hoan nghênh!</p>
<hr>
<h2>Liên hệ</h2>
<p>Nếu bạn có bất kỳ câu hỏi nào, hãy để lại comment hoặc gửi email cho tôi qua địa chỉ: <a href="mailto:nguyenmanh2004devgame@gmail.com">nguyenmanh2004devgame@gmail.com</a></p>
<p>Cảm ơn bạn đã đọc hướng dẫn này! Hy vọng nó sẽ giúp ích cho bạn trong việc sử dụng Cloudinary trong ứng dụng ASP.NET của mình. Nếu bạn thấy hữu ích, hãy chia sẻ với bạn bè và đồng nghiệp nhé! 😊</p>
`,
  code: [
    {
      file: 'appsettings.json',
      lang: 'json',
      value: `{
  "CloudinarySettings": {
    "CloudName": "your_cloud_name",
    "ApiKey": "your_api_key",
    "ApiSecret": "your_api_secret"
  }
}`
    },
    {
      file: 'CloudinarySettings.cs',
      lang: 'csharp',
      value: `public class CloudinarySettings
{
    public string CloudName { get; set; }
    public string ApiKey { get; set; }
    public string ApiSecret { get; set; }
}`
    },
    {
      file: 'UploadController.cs',
      lang: 'csharp',
      value: `using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

[ApiController]
[Route("api/[controller]")]
public class UploadController : ControllerBase
{
    private readonly Cloudinary _cloudinary; // Đối tượng dùng để giao tiếp với Cloudinary
    private readonly CloudinarySettings _settings; // Cấu hình (CloudName, ApiKey, ApiSecret)

    // Constructor khởi tạo Cloudinary từ cấu hình trong appsettings.json
    public UploadController(IOptions<CloudinarySettings> config)
    {
        _settings = config.Value;

        // Debug kiểm tra cấu hình đã được load chưa
        Console.WriteLine("==== Cloudinary Configuration ====");
        Console.WriteLine($"CloudName: {_settings.CloudName}");
        Console.WriteLine($"ApiKey: {_settings.ApiKey}");
        Console.WriteLine($"ApiSecret: {_settings.ApiSecret}");
        Console.WriteLine("==================================");

        // Khởi tạo tài khoản Cloudinary từ cấu hình
        var account = new Account(
            _settings.CloudName,
            _settings.ApiKey,
            _settings.ApiSecret
        );

        // Khởi tạo đối tượng Cloudinary
        _cloudinary = new Cloudinary(account);
    }

    // Các phương thức xử lý ảnh/video sẽ được thêm vào đây
}`
    },
    {
      file: 'Program.cs',
      lang: 'csharp',
      value: `builder.Services.Configure<CloudinarySettings>(
    builder.Configuration.GetSection("CloudinarySettings")
);`
    }
  ]
}