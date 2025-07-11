export default {
  id: 8,
  title: '🧩 Singleton trong Unity: Quản Lý Đối Tượng Toàn Cục Hiệu Quả',
  cover: 'https://i.pinimg.com/1200x/c1/8b/77/c18b778468606cde6781e208077017ce.jpg',
  author: 'Nguyễn Văn Mạnh',
  authorAvatar: 'https://avatars.githubusercontent.com/u/199482290?v=4',
  date: '14/07/2025 8:00 SA',
  topic: 'Unity, Singleton, Game Architecture',
  toc: [
    'Singleton là gì?',
    'Tại sao nên dùng Singleton trong Unity?',
    'Các kiểu Singleton phổ biến',
    'So sánh các cách cài đặt',
    'Lưu ý khi dùng Singleton',
    'Ví dụ code',
    'Tài liệu tham khảo',
    'Đóng góp',
    'Liên hệ'
  ],
  warning: '',
  barge: ['Unity', 'Singleton', 'GameManager', 'AudioManager'],
  content: `
<h1>🧩 Singleton trong Unity: Quản Lý Đối Tượng Toàn Cục Hiệu Quả</h1>
<hr>
<h2>Singleton là gì?</h2>
<blockquote>
  <b>Singleton</b> là một mẫu thiết kế (design pattern) đảm bảo chỉ có duy nhất <b>một instance</b> của một lớp tồn tại trong suốt vòng đời ứng dụng.  
  Trong Unity, Singleton thường dùng để quản lý các hệ thống toàn cục như GameManager, AudioManager, UIManager, v.v.
</blockquote>
<hr>
<h2>Tại sao nên dùng Singleton trong Unity?</h2>
<ul>
  <li><b>Quản lý trạng thái toàn cục:</b> Dễ dàng truy cập và lưu trữ dữ liệu chung (điểm số, cài đặt, trạng thái game...)</li>
  <li><b>Tiết kiệm bộ nhớ:</b> Đảm bảo chỉ có một đối tượng duy nhất, tránh tạo trùng lặp không cần thiết</li>
  <li><b>Giữ lại giữa các scene:</b> Có thể dùng <code>DontDestroyOnLoad</code> để giữ Singleton khi chuyển scene</li>
  <li><b>Dễ truy cập từ mọi nơi:</b> Chỉ cần gọi <code>ClassName.Instance</code> là có thể dùng ở bất kỳ đâu</li>
</ul>
<hr>
<h2>Các kiểu Singleton phổ biến trong Unity</h2>
<ul>
  <li><b>Normal Singleton:</b> Cách cài đặt đơn giản, phù hợp cho các đối tượng không cần tự động tạo mới</li>
  <li><b>Advanced Singleton:</b> Tự động tạo instance nếu chưa có, đảm bảo luôn tồn tại một đối tượng</li>
  <li><b>Generic Singleton:</b> Viết một class generic để tái sử dụng cho nhiều hệ thống khác nhau (GameManager, AudioManager...)</li>
</ul>
<hr>
<h2>So sánh các cách cài đặt Singleton</h2>
<ul>
  <li><b>Normal Singleton:</b> Đơn giản, dễ hiểu, nhưng phải tự tạo GameObject trước trong scene</li>
  <li><b>Advanced Singleton:</b> Tự động tạo GameObject nếu chưa có, không cần kéo thả thủ công</li>
  <li><b>Generic Singleton:</b> Dùng kế thừa để tạo Singleton cho nhiều class khác nhau, code gọn và dễ bảo trì</li>
</ul>
<hr>
<h2>Lưu ý khi dùng Singleton trong Unity</h2>
<ul>
  <li>Không lạm dụng Singleton cho mọi thứ, chỉ nên dùng cho các hệ thống thực sự toàn cục</li>
  <li>Tránh dùng Singleton cho các đối tượng có thể xuất hiện nhiều instance (ví dụ: enemy, item...)</li>
  <li>Chú ý khi reset hoặc reload scene, tránh tạo trùng lặp instance</li>
  <li>Singleton không thay thế hoàn toàn cho ScriptableObject hoặc Event System trong các trường hợp phức tạp</li>
</ul>
<hr>
<h2>Ví dụ code</h2>
<p><i>Xem code ở cuối bài</i></p>
<hr>
<h2>Tài liệu tham khảo</h2>
<ul>
  <li><a href="https://refactoring.guru/design-patterns/singleton" target="_blank">Singleton Pattern (Refactoring Guru)</a></li>
  <li><a href="https://gameprogrammingpatterns.com/singleton.html" target="_blank">Game Programming Patterns: Singleton</a></li>
  <li><a href="https://docs.unity3d.com/ScriptReference/Object.DontDestroyOnLoad.html" target="_blank">Unity Docs: DontDestroyOnLoad</a></li>
  <li><a href="https://learn.unity.com/tutorial/singletons" target="_blank">Unity Learn: Singletons</a></li>
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
      file: 'NormalSingleton.cs',
      lang: 'csharp',
      value: `using UnityEngine;

public class NormalSingleton : MonoBehaviour
{
    public static NormalSingleton Instance { get; private set; }

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject); // Giữ lại giữa các scene
        }
        else
        {
            Destroy(gameObject); // Xóa instance trùng lặp
        }
    }
    // Thêm các phương thức và thuộc tính cần thiết cho Singleton tại đây
    public void ExampleMethod()
    {
        Debug.Log("This is an example method in the NormalSingleton class.");
    }
}
// MonoBehaviour này sẽ đảm bảo rằng chỉ có một instance của NormalSingleton tồn tại trong toàn bộ ứng dụng.
// Bạn có thể gọi NormalSingleton.Instance để truy cập instance này từ bất kỳ đâu trong mã
public class ExampleUsage : MonoBehaviour
{
    private void Start()
    {
        // Sử dụng NormalSingleton
        NormalSingleton.Instance.ExampleMethod();
    }
}
`
    },
    {
      file: 'AdvancedSingleton.cs',
      lang: 'csharp',
      value: `using UnityEngine;

public class AdvancedSingleton : MonoBehaviour
{
    private static AdvancedSingleton instance;

    public static AdvancedSingleton Instance
    {
        get
        {
            if (instance == null)
            {
                // Tự tạo Singleton nếu chưa tồn tại
                GameObject singletonObject = new GameObject("AdvancedSingleton");
                instance = singletonObject.AddComponent<AdvancedSingleton>();
                DontDestroyOnLoad(singletonObject);
            }
            return instance;
        }
    }

    private void Awake()
    {
        if (instance == null)
        {
            instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else if (instance != this)
        {
            Destroy(gameObject); // Xóa GameObject trùng lặp
        }
    }
    // Thêm các phương thức và thuộc tính cần thiết cho Singleton tại đây
    public void ExampleMethod()
    {
        Debug.Log("This is an example method in the AdvancedSingleton class.");
    }
    public void ResetInstance()
    {
        instance = null; // Cho phép tạo lại instance nếu cần
        Debug.Log("AdvancedSingleton instance has been reset.");
    }
}
// MonoBehaviour này sẽ đảm bảo rằng chỉ có một instance của AdvancedSingleton tồn tại trong toàn bộ ứng dụng.
// Bạn có thể gọi AdvancedSingleton.Instance để truy cập instance này từ bất kỳ đâu trong mã

// Ví dụ sử dụng AdvancedSingleton
public class AdvancedSingletonExampleUsage : MonoBehaviour
{
    private void Start()
    {
        // Sử dụng AdvancedSingleton
        AdvancedSingleton.Instance.ExampleMethod();
        
        // Reset instance nếu cần
        // AdvancedSingleton.Instance.ResetInstance();
    }
}
`
    },
    {
      file: 'SingletonGeneric.cs',
      lang: 'csharp',
      value: `using UnityEngine;

// Lớp Singleton Generic giúp tạo Singleton tự động cho bất kỳ lớp nào kế thừa từ MonoBehaviour
public class Singleton<T> : MonoBehaviour where T : MonoBehaviour
{
    private static T instance; // Biến tĩnh lưu trữ instance duy nhất của Singleton

    // Truy cập Instance của Singleton
    [System.Obsolete]
    public static T Instance
    {
        get
        {
            if (instance == null) // Nếu instance chưa tồn tại
            {
                instance = FindObjectOfType<T>(); // Tìm trong scene hiện tại

                if (instance == null) // Nếu vẫn không tìm thấy
                {
                    // Tự động tạo mới Singleton
                    GameObject singletonObject = new GameObject(typeof(T).Name);
                    instance = singletonObject.AddComponent<T>();
                    DontDestroyOnLoad(singletonObject); // Đảm bảo không bị phá hủy khi chuyển scene
                }
            }
            return instance; // Trả về instance duy nhất
        }
    }

    // Đảm bảo chỉ có một instance tồn tại, và giữ lại giữa các scene
    protected virtual void Awake()
    {
        if (instance == null) // Nếu instance chưa được gán
        {
            instance = this as T; // Gán instance cho đối tượng hiện tại
            DontDestroyOnLoad(gameObject); // Đảm bảo đối tượng này không bị phá hủy
        }
        else if (instance != this) // Nếu đã tồn tại instance khác
        {
            Destroy(gameObject); // Phá hủy đối tượng mới để tránh trùng lặp
        }
    }
}

// Lớp GameManager kế thừa từ Singleton<GameManager>
// Đây là một ví dụ cụ thể về việc sử dụng Singleton Generic
public class GameManager : Singleton<GameManager>
{
    public int playerScore; // Lưu trữ điểm số của người chơi

    // Ghi đè phương thức Awake để thêm logic tùy chỉnh khi GameManager khởi tạo
    protected override void Awake()
    {
        base.Awake(); // Gọi logic từ lớp Singleton
        Debug.Log("GameManager Initialized"); // In ra Console để kiểm tra khởi tạo
    }

    // Hàm để cộng điểm cho người chơi
    public void AddScore(int score)
    {
        playerScore += score; // Tăng điểm số
        Debug.Log($"Player Score: {playerScore}"); // In ra điểm số hiện tại
    }
}
public class AudioManager : Singleton<AudioManager>
{
    // Hàm để phát âm thanh
    public void PlaySound(string soundName)
    {
        Debug.Log($"Playing sound: {soundName}"); // In ra tên âm thanh đang phát
    }
}
// Lớp này có thể được sử dụng trong các scene khác nhau mà không cần phải tạo lại instance
// Ví dụ:
public class ExampleSceneUsage : MonoBehaviour
{
    private void Start()
    {
        // Sử dụng GameManager
        GameManager.Instance.AddScore(10);
        
        // Sử dụng AudioManager
        AudioManager.Instance.PlaySound("BackgroundMusic");
    }
}
`
    }
  ]
}