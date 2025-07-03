export default {
  id: 1,
  title: 'Tạo ra 1 package server (npm, nuget, ..) của riêng bạn',
  cover: 'https://placehold.co/800x300?text=NuGet',
  author: 'Ho Ngoc D Oanh',
  authorAvatar: 'https://placehold.co/40x40?text=HN',
  date: '9/24/2020 5:27 SA',
  toc: ['Giới thiệu', 'Cách tạo package', 'Kết luận'],
  warning: '',
  barge: ['NuGet'],
  content: `<p>Hẳn là nó được lấy được từ server npm hay nuget rồi phải không...</p>
  <p>Nhưng nếu bạn muốn tạo ra 1 package server của riêng bạn, thì có thể làm theo hướng dẫn sau:</p>
  <h2>Giới thiệu</h2>
  <p>Để tạo ra package server của riêng bạn, bạn cần:</p>
  <ul>
    <li>Node.js và npm (hoặc nuget cho .NET)</li>
    <li>Kiến thức cơ bản về lập trình và các công nghệ web</li>
  </ul>
  <p>Bạn có thể tham khảo tài liệu chính thức của npm hoặc nuget để biết thêm chi tiết.</p>
  `,
  code: [
    {
      lang: 'csharp',
      value: `// Controller mẫu cho ASP.NET Web API
public class ValuesController : ApiController {
  public IEnumerable<string> Get() {
    return new string[] { "value1", "value2" };
  }
}` },
  ],
  views: '1.0K',
  comments: 1,
  bookmarks: 0,
}