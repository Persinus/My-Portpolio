export default {
  id: 10,
  title: '♻️ Object Pool Pattern trong Unity: Tối Ưu Hiệu Năng Game',
  cover: 'https://i.pinimg.com/originals/11/1c/23/111c2309e4cbb325bb3d21afcefd768f.gif',
  author: 'Nguyễn Văn Mạnh',
  authorAvatar: 'https://avatars.githubusercontent.com/u/199482290?v=4',
  date: '16/07/2025 8:00 SA',
  topic: 'Unity, Object Pool, Game Optimization',
  toc: [
    'Object Pool là gì?',
    'Tại sao nên dùng Object Pool?',
    'Cách hoạt động của Object Pool',
    'Kết hợp Singleton và Object Pool',
    'Ví dụ code',
    'Tài liệu tham khảo',
    'Đóng góp',
    'Liên hệ'
  ],
  warning: '',
  barge: ['Unity', 'Object Pool', 'Pooling', 'Optimization', 'Singleton'],
  content: `
<h1>♻️ Object Pool Pattern trong Unity: Tối Ưu Hiệu Năng Game</h1>
<hr>
<h2>Object Pool là gì?</h2>
<blockquote>
  <b>Object Pool</b> (bể đối tượng) là một mẫu thiết kế giúp quản lý và tái sử dụng các đối tượng (GameObject) thay vì tạo mới và huỷ liên tục.  
  Thường dùng cho các đối tượng xuất hiện/lặp lại nhiều lần như đạn, hiệu ứng, enemy, v.v.
</blockquote>
<hr>
<h2>Tại sao nên dùng Object Pool?</h2>
<ul>
  <li><b>Giảm GC & lag spike:</b> Không tạo/destroy liên tục, giảm rác bộ nhớ (Garbage Collection).</li>
  <li><b>Tăng hiệu năng:</b> Đối tượng được tái sử dụng, game chạy mượt hơn, nhất là trên mobile.</li>
  <li><b>Dễ quản lý:</b> Chủ động kiểm soát số lượng object đang hoạt động.</li>
  <li><b>Kết hợp tốt với Singleton:</b> Đảm bảo chỉ có một Pool duy nhất cho mỗi loại object.</li>
</ul>
<hr>
<h2>Cách hoạt động của Object Pool</h2>
<ul>
  <li>Khi cần object: Lấy từ pool (nếu có sẵn) hoặc tạo mới nếu pool chưa đủ.</li>
  <li>Khi không dùng nữa: Đưa object về pool, tắt (SetActive(false)), chờ tái sử dụng.</li>
  <li>Không huỷ (Destroy) object, chỉ ẩn/hiện lại.</li>
</ul>
<hr>
<h2>Kết hợp Singleton và Object Pool</h2>
<ul>
  <li>Dùng Singleton để đảm bảo mỗi loại Pool chỉ có một instance duy nhất trong game.</li>
  <li>Pool có thể quản lý nhiều loại prefab khác nhau hoặc chỉ một loại.</li>
  <li>Các hệ thống như BulletPool, EnemyPool, EffectPool đều nên dùng Singleton.</li>
</ul>
<hr>
<h2>Ví dụ code</h2>
<p><i>Xem code ở cuối bài</i></p>
<hr>
<h2>Tài liệu tham khảo</h2>
<ul>
  <li><a href="https://refactoring.guru/design-patterns/object-pool" target="_blank">Object Pool Pattern (Refactoring Guru)</a></li>
  <li><a href="https://learn.unity.com/tutorial/object-pooling" target="_blank">Unity Learn: Object Pooling</a></li>
  <li><a href="https://docs.unity3d.com/Manual/InstantiatingPrefabs.html" target="_blank">Unity Docs: Instantiating Prefabs</a></li>
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
      file: 'ObjectPool.cs',
      lang: 'csharp',
      value: `using UnityEngine;
using System.Collections.Generic;

// Singleton Object Pool cho 1 loại prefab
public class ObjectPool : MonoBehaviour
{
    public static ObjectPool Instance { get; private set; }

    [Header("Prefab để pool")]
    public GameObject prefab;

    [Header("Số lượng khởi tạo ban đầu")]
    public int initialSize = 10;

    private Queue<GameObject> pool = new Queue<GameObject>();

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
            InitializePool();
        }
        else
        {
            Destroy(gameObject);
        }
    }

    private void InitializePool()
    {
        for (int i = 0; i < initialSize; i++)
        {
            GameObject obj = Instantiate(prefab);
            obj.SetActive(false);
            pool.Enqueue(obj);
        }
    }

    // Lấy object từ pool
    public GameObject GetObject()
    {
        if (pool.Count > 0)
        {
            GameObject obj = pool.Dequeue();
            obj.SetActive(true);
            return obj;
        }
        else
        {
            // Nếu hết thì tạo mới
            GameObject obj = Instantiate(prefab);
            obj.SetActive(true);
            return obj;
        }
    }

    // Trả object về pool
    public void ReturnObject(GameObject obj)
    {
        obj.SetActive(false);
        pool.Enqueue(obj);
    }
}

// Ví dụ sử dụng ObjectPool
public class BulletSpawner : MonoBehaviour
{
    public Transform firePoint;

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            GameObject bullet = ObjectPool.Instance.GetObject();
            bullet.transform.position = firePoint.position;
            bullet.transform.rotation = firePoint.rotation;
        }
    }
}

// Gắn script này vào viên đạn để tự trả về pool khi không còn sử dụng
public class Bullet : MonoBehaviour
{
    private void OnDisable()
    {
        // Trả viên đạn về pool sau 2 giây
        Invoke("ReturnToPool", 2f);
    }

    private void ReturnToPool()
    {
        ObjectPool.Instance.ReturnObject(gameObject);
    }
}
`
    }
  ]
}