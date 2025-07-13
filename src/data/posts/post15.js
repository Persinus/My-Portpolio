export default {
  id: 15,
  title: '🧠✨ Kết Hợp Diệu Kỳ: State Pattern + Brain Pattern Trong Unity AI',
  cover: 'https://i.pinimg.com/originals/f9/d0/f6/f9d0f62b61eae982a703e3b8edc8fc16.gif',
  author: 'Nguyễn Văn Mạnh',
  authorAvatar: 'https://avatars.githubusercontent.com/u/199482290?v=4',
  date: '11/07/2025 14:44 PM',
  topic: 'Unity, AI, Brain Pattern, State Pattern',
  toc: [
    'Giới thiệu',
    'State Pattern là gì?',
    'Brain Pattern là gì?',
    'Tại sao nên kết hợp cả hai?',
    'Sơ đồ hoạt động',
    'Triển khai trong Unity',
    'Tổng kết',
    'Liên hệ'
  ],
  warning: '',
  barge: ['Unity', 'AI', 'Pattern', 'FSM', 'StateMachine', 'Brain'],
  content: `
<h1>🧠✨ Kết Hợp Diệu Kỳ: State Pattern + Brain Pattern Trong Unity AI</h1>
<hr>

<h2>Giới thiệu</h2>
<p>Bạn đang xây dựng một enemy thông minh trong game? Vậy thì đây chính là combo "đỉnh cao": <b>State Pattern</b> + <b>Brain Pattern</b>.</p>
<p>Kết hợp này giúp bạn phân tách rõ ràng giữa <b>Hành vi tổng thể</b> (patrol, chase, attack) và <b>Trạng thái hiện tại</b> (idle, walk, attack animation), cực kỳ dễ mở rộng, dễ kiểm soát.</p>

<hr>

<h2>State Pattern là gì?</h2>
<blockquote>
<b>State Pattern</b> là mẫu thiết kế cho phép một đối tượng thay đổi hành vi của nó khi trạng thái bên trong thay đổi.  
Nó giúp tránh lặp <code>if-else</code> hoặc <code>switch</code> lộn xộn bằng cách <b>đóng gói mỗi trạng thái thành một class riêng biệt</b>.
</blockquote>
<p>Trong Unity, ta thường dùng để kiểm soát Animation hoặc trạng thái logic như Idle, Walk, Attack.</p>

<hr>

<h2>Brain Pattern là gì?</h2>
<blockquote>
<b>Brain Pattern</b> là một pattern độc lập, mô phỏng bộ não AI: mỗi “brain” (não) đại diện cho một hành vi cao cấp (patrol, aggro, return...), có khả năng điều khiển chuyển trạng thái (State) và logic điều hướng.
</blockquote>
<p>Giúp chia nhỏ hành vi AI phức tạp thành nhiều phần rõ ràng, linh hoạt, dễ thay thế.</p>

<hr>

<h2>Tại sao nên kết hợp cả hai?</h2>
<ul>
  <li>🧠 <b>Brain Pattern</b> xử lý chiến lược (AI logic): tuần tra, phát hiện kẻ địch, tấn công,...</li>
  <li>🎭 <b>State Pattern</b> xử lý trạng thái nhân vật: Idle, Walk, Attack, Die,...</li>
  <li>🔗 Kết hợp → Tách biệt rõ ràng giữa AI và Animation/State</li>
  <li>💡 Dễ mở rộng, debug dễ, test từng phần độc lập</li>
</ul>

<hr>

<h2>Sơ đồ hoạt động</h2>
<p style="text-align:center;">
  <img src="https://i.imgur.com/HNNnKyF.png" alt="State + Brain FSM Flow" width="100%">
</p>
<p><i>Brain quyết định chuyển hành vi → Gán State tương ứng để điều khiển animation hoặc logic</i></p>

<hr>

<h2>Triển khai trong Unity</h2>
<p>Chúng ta sẽ tạo ra 2 interface:</p>
<ul>
  <li><b>IBrain:</b> xử lý AI cao cấp, chứa các “Brain” như PatrolBrain, AggroBrain,...</li>
  <li><b>IEnemyState:</b> các trạng thái như Idle, Walk, Attack,...</li>
</ul>

<p>Toàn bộ ví dụ code xem ở phần <b>cuối bài viết</b>.</p>

<hr>

<h2>Tổng kết</h2>
<ul>
  <li>✅ Tách rõ AI và Animation logic</li>
  <li>✅ Có thể dễ dàng thêm <b>FlyBrain, RangeAttackBrain,...</b> mà không đụng vào code cũ</li>
  <li>✅ Có thể đổi Animation mà không ảnh hưởng AI</li>
  <li>✅ Gắn Spine Animation dễ hơn do State quản lý riêng</li>
</ul>

<hr>

<h2>Liên hệ</h2>
<p>Nếu bạn muốn mở rộng sang hệ thống Boss AI, phối hợp Animation Events hoặc xử lý Multi-Brain nâng cao — inbox mình tại:</p>
<p><a href="mailto:nguyenmanh2004devgame@gmail.com">nguyenmanh2004devgame@gmail.com</a></p>
<p>❤️ Đừng quên chia sẻ nếu bạn thấy bài viết hữu ích!</p>
  `,
  code: [
    {
      file: 'BrainHost.cs',
      lang: 'csharp',
      value: `using UnityEngine;
using Spine.Unity;

public class BrainHost : MonoBehaviour
{
    private IBrain currentBrain;
    public EnemyFSM fsm = new EnemyFSM();

    public Transform target;
    public float maxChaseRange = 7f;
    public float aggroTimeout = 3f;
    public float speed = 2f;
    public Vector2 patrolOrigin;
    public SkeletonAnimation spine;
    public Rigidbody2D rb;

    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        patrolOrigin = transform.position;
        SetBrain(new PatrolBrain());
    }

    void Update()
    {
        currentBrain?.Tick();
        fsm?.Tick();
    }

    public void SetBrain(IBrain brain)
    {
        currentBrain = brain;
        brain.Setup(this);
    }

    public void SetState(IEnemyState state)
    {
        fsm.ChangeState(state);
    }

    public void PlayAnim(string animName, bool loop = true)
    {
        if (spine != null)
            spine.AnimationState.SetAnimation(0, animName, loop);
    }

    private float currentFacing = 1f;
    public void FlipTowardsX(float xDir)
    {
        if (xDir != 0 && Mathf.Sign(xDir) != Mathf.Sign(currentFacing))
        {
            Vector3 scale = transform.localScale;
            scale.x = Mathf.Sign(xDir) * Mathf.Abs(scale.x);
            transform.localScale = scale;
            currentFacing = Mathf.Sign(xDir);
        }
    }
}`
    },
    {
      file: 'IBrain.cs',
      lang: 'csharp',
      value: `public interface IBrain {
    void Setup(BrainHost host);
    void Tick();
}`
    },
    {
      file: 'IEnemyState.cs',
      lang: 'csharp',
      value: `public interface IEnemyState {
    void Enter();
    void Update();
    void Exit();
}`
    },
    {
      file: 'EnemyFSM.cs',
      lang: 'csharp',
      value: `public class EnemyFSM {
    private IEnemyState current;

    public void ChangeState(IEnemyState next) {
        current?.Exit();
        current = next;
        current?.Enter();
    }

    public void Tick() {
        current?.Update();
    }
}`
    },
    {
      file: 'Brains.cs',
      lang: 'csharp',
      value: `// Gồm PatrolBrain, AggroBrain, AttackBrain, ReturnToPatrolBrain
// Xem chi tiết ở phần ví dụ chính bạn đã cung cấp, có thể tách riêng thành file khác nếu muốn modular
// Mỗi Brain sử dụng host.SetState(new WalkState(...)) hoặc AttackState để chuyển animation`
    },
    {
      file: 'States.cs',
      lang: 'csharp',
      value: `public class IdleState : IEnemyState {
    private BrainHost host;
    public IdleState(BrainHost host) { this.host = host; }
    public void Enter() => host.PlayAnim("Idle", true);
    public void Update() { }
    public void Exit() { }
}

public class WalkState : IEnemyState {
    private BrainHost host;
    public WalkState(BrainHost host) { this.host = host; }
    public void Enter() => host.PlayAnim("Walk", true);
    public void Update() { }
    public void Exit() { }
}

public class AttackState : IEnemyState {
    private BrainHost host;
    private float timer = 0f;
    private float attackCooldown = 1f;
    public AttackState(BrainHost host) { this.host = host; }
    public void Enter() => host.PlayAnim("Attack", true);
    public void Update() {
        timer += Time.deltaTime;
        if (timer >= attackCooldown) {
            timer = 0f;
            // host.DoAttack();
        }
    }
    public void Exit() { }
}`
    }
  ]
}
