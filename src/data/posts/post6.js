export default {
  id: 6,
  title: '🎧 FMOD cho Unity: Âm Thanh Chuyên Nghiệp Cho Game',
  cover: 'https://d26jga8jjsa591.cloudfront.net/web/feature-fullscreen-mixer.jpg',
  author: 'Nguyễn Văn Mạnh',
  authorAvatar: 'https://avatars.githubusercontent.com/u/199482290?v=4',
  date: '12/07/2025 8:00 SA',
  topic: 'Unity, FMOD, Audio',
  toc: [
    'FMOD là gì?',
    'FMOD giúp gì cho Unity?',
    'So sánh FMOD và Unity Audio',
    'Khi nào nên dùng FMOD?',
    'Ví dụ code',
    'Tài liệu tham khảo',
    'Đóng góp',
    'Liên hệ'
  ],
  warning: '',
  barge: ['FMOD', 'Unity', 'Audio', 'Game Sound'],
  content: `
<h1>🎧 FMOD cho Unity: Âm Thanh Chuyên Nghiệp Cho Game</h1>
<hr>
<h2>🧠 FMOD là gì?</h2>
<blockquote>
  <a href="https://www.fmod.com/" target="_blank"><b>FMOD</b></a> là phần mềm trung gian xử lý âm thanh (audio middleware) cho game, cho phép thiết kế, điều khiển và phát âm thanh phức tạp qua phần mềm riêng (FMOD Studio) và tích hợp vào Unity bằng plugin.
</blockquote>
<h2>✅ FMOD giúp gì cho Unity?</h2>
<ul>
  <li>Quản lý toàn bộ hệ thống âm thanh game trong FMOD Studio</li>
  <li>Tạo nhạc nền động, biến đổi theo tình huống (combat, vùng nước, ban đêm…)</li>
  <li>Phát âm thanh theo sự kiện thay vì AudioClip đơn lẻ</li>
  <li>Áp dụng hiệu ứng (reverb, 3D, distance fade...) linh hoạt</li>
  <li>Cho phép sound designer làm việc độc lập, không cần đụng Unity</li>
</ul>
<hr>
<h2>🎮 Ví dụ sử dụng FMOD và Unity Audio</h2>
<ul>
  <li><b>Với Unity Audio:</b></li>
</ul>
<p><i>Xem code ở cuối bài</i></p>
<ul>
  <li><b>Với FMOD:</b></li>
</ul>
<p><i>Xem code ở cuối bài</i></p>
<hr>
<h2>🔎 FMOD khác gì Unity Audio thường?</h2>
<ul>
  <li><b>Thiết kế âm thanh động:</b> FMOD ✅ | Unity Audio ❌</li>
  <li><b>Random, blend clip dễ:</b> FMOD ✅ | Unity Audio ❌</li>
  <li><b>Spatial 3D audio nâng cao:</b> FMOD ✅ | Unity Audio 😐</li>
  <li><b>Biến đổi theo tham số gameplay:</b> FMOD ✅ | Unity Audio ❌</li>
  <li><b>Điều kiện logic (nếu A thì chơi B):</b> FMOD ✅ | Unity Audio ❌</li>
  <li><b>Cho sound designer dùng riêng:</b> FMOD ✅ | Unity Audio ❌</li>
  <li><b>Quản lý hàng trăm âm thanh:</b> FMOD ✅ | Unity Audio: Rối, thủ công</li>
  <li><b>Nhạc nền động (dynamic music):</b> FMOD ✅ | Unity Audio ❌</li>
</ul>
<hr>
<h2>🛠 Tóm tắt kỹ thuật</h2>
<ul>
  <li><b>Dựa trên clip:</b> Unity Audio ✅ | FMOD ❌ (dựa trên event)</li>
  <li><b>Cần AudioSource:</b> Unity Audio ✅ | FMOD ❌ (gọi thẳng qua event string)</li>
  <li><b>Mixer dễ dùng:</b> Unity Audio ❌ | FMOD ✅</li>
  <li><b>UI thiết kế âm thanh:</b> Unity Audio ❌ | FMOD ✅</li>
  <li><b>Dễ test/phát triển độc lập:</b> Unity Audio ❌ | FMOD ✅</li>
  <li><b>Gọi qua code:</b> Unity Audio <code>.PlayOneShot(clip)</code> | FMOD <code>.PlayOneShot("event:/...")</code></li>
</ul>
<hr>
<h2>📌 Khi nào nên dùng FMOD?</h2>
<ul>
  <li><b>Game nhỏ (platformer, arcade...):</b> ❌ Unity Audio là đủ</li>
  <li><b>Game vừa (có voice, nhạc nền biến đổi...):</b> ✅ Nên dùng FMOD</li>
  <li><b>Game lớn, làm việc với sound designer:</b> ✅✅ FMOD gần như là bắt buộc</li>
</ul>
<hr>
<h2>🔚 Tổng kết nhanh</h2>
<ul>
  <li><b>FMOD là gì?</b> Phần mềm thiết kế & xử lý âm thanh cho game</li>
  <li><b>Nó có thay thế Unity Audio không?</b> Có – mạnh hơn, chuyên nghiệp hơn</li>
  <li><b>Có dễ dùng không?</b> Cần học thêm FMOD Studio, nhưng dễ sau khi quen</li>
  <li><b>Dành cho ai?</b> Dev cần âm thanh phức tạp, hoặc làm việc với sound designer</li>
</ul>
<hr>
<h2>Ví dụ code</h2>
<ul>
  <li><b>Unity Audio:</b></li>
</ul>
<p><i>Xem code ở cuối bài</i></p>
<ul>
  <li><b>FMOD Unity:</b></li>
</ul>
<p><i>Xem code ở cuối bài</i></p>
<hr>
<h2>Tài liệu tham khảo</h2>
<ul>
  <li><a href="https://www.fmod.com/resources/documentation-unity" target="_blank">FMOD for Unity Documentation</a></li>
  <li><a href="https://www.fmod.com/download" target="_blank">Tải FMOD Studio</a></li>
  <li><a href="https://www.youtube.com/results?search_query=fmod+unity+tutorial" target="_blank">FMOD Unity Tutorial (YouTube)</a></li>
  <li><a href="https://docs.unity3d.com/Manual/Audio.html" target="_blank">Unity Audio Manual</a></li>
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
      file: 'UnityAudioExample.cs',
      lang: 'csharp',
      value: `// Unity Audio: PlayOneShot ví dụ cơ bản
public AudioClip jumpSound;
public AudioSource source;

void Jump()
{
    source.PlayOneShot(jumpSound);
}`
    },
    {
      file: 'FMODUnityExample.cs',
      lang: 'csharp',
      value: `// FMOD Unity: PlayOneShot bằng event string
// Cần cài FMOD Unity Integration và import event từ FMOD Studio
using FMODUnity;

void Jump()
{
    RuntimeManager.PlayOneShot("event:/SFX/Jump");
}`
    }
  ]
}