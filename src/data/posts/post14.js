export default {
  id: 14,
  title: '🌐 UnityWebRequest: Gửi API & Tải Dữ Liệu Từ Web Trong Unity',
  cover: 'https://i.pinimg.com/originals/f3/fc/46/f3fc46283e2084e69ac7859a03259a63.gif',
  author: 'Nguyễn Văn Mạnh',
  authorAvatar: 'https://avatars.githubusercontent.com/u/199482290?v=4',
  date: '11/07/2025 11:30 AM',
  topic: 'Unity Networking, UnityWebRequest, API, HTTP',
  toc: [
    'UnityWebRequest là gì?',
    'Các loại request phổ biến',
    'Tải JSON, ảnh, file',
    'Gửi dữ liệu (POST)',
    'Thêm Header (Authorization)',
    'Xử lý lỗi thường gặp',
    'Ví dụ code',
    'Liên hệ'
  ],
  warning: '',
  barge: ['Unity', 'WebRequest', 'Networking', 'API', 'UnityPackage'],
  content: `
<h1>🌐 UnityWebRequest: Gửi API & Tải Dữ Liệu Từ Web Trong Unity</h1>
<p><i>Bài này sẽ giúp bạn làm chủ việc giao tiếp giữa Unity và Web: lấy JSON, gửi POST, tải ảnh... tất cả chỉ bằng vài dòng code.</i></p>

<hr>

<h2>UnityWebRequest là gì?</h2>
<blockquote>
<b>UnityWebRequest</b> là API chính thức của Unity để gửi và nhận dữ liệu qua HTTP/S.<br>
Phổ biến trong các tác vụ:
<ul>
  <li>📥 Tải JSON, ảnh, file</li>
  <li>📤 Gửi form, login, dữ liệu người chơi</li>
  <li>🔑 Giao tiếp với API cần xác thực</li>
</ul>
</blockquote>

<h2>Các loại request phổ biến</h2>
<ul>
  <li><code>UnityWebRequest.Get(url)</code> – tải dữ liệu</li>
  <li><code>UnityWebRequest.Post(url, form)</code> – gửi form</li>
  <li><code>UnityWebRequestTexture.GetTexture(url)</code> – tải ảnh</li>
</ul>

<h2>Tải JSON, ảnh, file</h2>
<p><i>Xem phần code ở cuối bài viết</i></p>

<h2>Gửi dữ liệu (POST)</h2>
<p>Hỗ trợ cả <b>form</b> và <b>JSON</b>. Tùy vào server backend mà bạn dùng cách phù hợp.</p>
<p><i>Xem phần code ở cuối bài viết</i></p>

<h2>Thêm Header (Authorization)</h2>
<ul>
  <li>Dùng <code>SetRequestHeader("Authorization", "Bearer TOKEN")</code></li>
  <li>Thường đi kèm khi dùng với API REST có bảo mật</li>
</ul>

<h2>Xử lý lỗi thường gặp</h2>

| Lỗi | Nguyên nhân | Giải pháp |
|-----|-------------|-----------|
| \`request.error != null\` | Sai URL, server lỗi | Kiểm tra URL, internet |
| \`result != Success\` | CORS hoặc HTTP 4xx/5xx | Kiểm tra server & headers |
| \`WebGL lỗi CORS\` | Thiếu header \`Access-Control-Allow-Origin\` | Cần chỉnh backend |

<h2>Ví dụ code</h2>
<p><i>Có 4 file minh hoạ thực tế ở phần <code>code[]</code>:</i></p>
<ul>
  <li>📦 <b>Get JSON</b> từ API</li>
  <li>🖼 <b>Load ảnh</b> từ URL vào Material</li>
  <li>📤 <b>Gửi form</b> (POST)</li>
  <li>🔐 <b>Gửi JSON + Header</b></li>
</ul>

<h2>Liên hệ</h2>
<p>Nếu bạn cần thêm các ví dụ thực chiến hoặc gặp lỗi khi triển khai, hãy inbox mình qua:</p>
<p><a href="mailto:nguyenmanh2004devgame@gmail.com">nguyenmanh2004devgame@gmail.com</a></p>
  `,
  code: [
    {
      file: 'FetchJSON.cs',
      lang: 'csharp',
      value: `using UnityEngine;
using UnityEngine.Networking;
using System.Collections;

public class FetchJSON : MonoBehaviour
{
    void Start()
    {
        StartCoroutine(GetJson());
    }

    IEnumerator GetJson()
    {
        UnityWebRequest request = UnityWebRequest.Get("https://jsonplaceholder.typicode.com/posts/1");
        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
            Debug.Log(request.downloadHandler.text);
        else
            Debug.LogError(request.error);
    }
}`
    },
    {
      file: 'DownloadImage.cs',
      lang: 'csharp',
      value: `using UnityEngine;
using UnityEngine.Networking;
using System.Collections;

public class DownloadImage : MonoBehaviour
{
    public Renderer target;

    void Start()
    {
        StartCoroutine(LoadImage());
    }

    IEnumerator LoadImage()
    {
        UnityWebRequest request = UnityWebRequestTexture.GetTexture("https://via.placeholder.com/256");
        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            Texture2D texture = DownloadHandlerTexture.GetContent(request);
            target.material.mainTexture = texture;
        }
        else
        {
            Debug.LogError(request.error);
        }
    }
}`
    },
    {
      file: 'PostForm.cs',
      lang: 'csharp',
      value: `using UnityEngine;
using UnityEngine.Networking;
using System.Collections;

public class PostForm : MonoBehaviour
{
    void Start()
    {
        StartCoroutine(SendForm());
    }

    IEnumerator SendForm()
    {
        WWWForm form = new WWWForm();
        form.AddField("username", "manhdev");
        form.AddField("score", 9000);

        UnityWebRequest request = UnityWebRequest.Post("https://yourapi.com/submit", form);
        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
            Debug.Log("Form sent!");
        else
            Debug.LogError(request.error);
    }
}`
    },
    {
      file: 'PostJSON.cs',
      lang: 'csharp',
      value: `using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using System.Text;

public class PostJSON : MonoBehaviour
{
    void Start()
    {
        StartCoroutine(SendJSON());
    }

    IEnumerator SendJSON()
    {
        string json = "{\"username\":\"manhdev\",\"score\":9500}";
        byte[] bodyRaw = Encoding.UTF8.GetBytes(json);

        UnityWebRequest request = new UnityWebRequest("https://yourapi.com/json", "POST");
        request.uploadHandler = new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = new DownloadHandlerBuffer();

        request.SetRequestHeader("Content-Type", "application/json");
        request.SetRequestHeader("Authorization", "Bearer your_token_here");

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
            Debug.Log("JSON sent!");
        else
            Debug.LogError(request.error);
    }
}`
    }
  ]
}

