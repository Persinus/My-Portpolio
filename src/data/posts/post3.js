export default {
  id: 3,
  title: 'Bài 3: Finite State Machine (FSM) trong Photon Fusion',
  cover: 'https://i.pinimg.com/736x/66/e2/fc/66e2fc79cf3db30bc66a88a7007f1e96.jpg',
  author: 'Nguyễn Văn Mạnh',
  authorAvatar: 'https://avatars.githubusercontent.com/u/199482290?v=4',
  date: '9/24/2020 5:27 SA',
  topic: 'Backend',
  toc: [
    'Tổng quan về FSM',
    'Cách tải của FSM trong Fusion',
    'Cấu trúc cơ bản của FSM trong Fusion',
    'Cách triển khai FSM',
    'Cách hoạt động của FSM',
    'Ưu điểm của FSM trong Fusion',
    'Gợi ý mở rộng'
  ],
  warning: '',
  barge: ['Photon Fusion', 'FSM', 'Unity'],
  content: `
<p>Finite State Machine (FSM) là một mô hình toán học mạnh mẽ, đặc biệt hữu ích trong việc quản lý trạng thái và hành vi phức tạp của các đối tượng trong game. Trong Photon Fusion, FSM giúp tổ chức và quản lý hành vi của các thực thể trong môi trường mạng một cách hiệu quả.</p>
<hr>
<h2>1. Tổng quan về FSM</h2>
<p>FSM là một mô hình gồm:</p>
<ul>
  <li><strong>Trạng thái (States):</strong> Các trạng thái của đối tượng.</li>
  <li><strong>Chuyển tiếp (Transitions):</strong> Quy tắc và điều kiện chuyển giữa các trạng thái.</li>
  <li><strong>Sự kiện (Events):</strong> Tác nhân kích hoạt sự chuyển tiếp.</li>
</ul>
<h3>Tính năng của FSM trong Photon Fusion:</h3>
<ul>
  <li><strong>Hỗ trợ nhiều máy trạng thái:</strong> Nhiều FSM có thể chạy song song trên cùng một đối tượng.</li>
  <li><strong>Cấu trúc phân cấp:</strong> Cho phép tổ chức máy trạng thái con bên trong máy trạng thái cha.</li>
  <li><strong>Quản lý trạng thái:</strong> Tự động chuyển đổi trạng thái dựa trên điều kiện hoặc ưu tiên.</li>
  <li><strong>Đồng bộ hóa trạng thái:</strong> Đảm bảo tất cả client đều có cùng trạng thái thông qua StateMachineController.</li>

</ul>
<hr>
<h2>2.Cách tải của FSM trong Fusion</h2>
<li>Photon Fusion cung cấp một hệ thống FSM mạnh mẽ để quản lý trạng thái của các đối tượng trong game. Hệ thống này cho phép bạn định nghĩa các trạng thái và chuyển tiếp giữa chúng một cách dễ dàng, đồng thời hỗ trợ đồng bộ hóa trạng thái qua mạng.</li>
<li>Để sử dụng FSM trong Fusion, bạn cần cài đặt gói <code>Fusion.Addons.FSM</code> từ Fusion Package Manager. Sau khi cài đặt, bạn có thể tạo các trạng thái và chuyển tiếp bằng cách kế thừa từ lớp <code>StateBehaviour</code>.</li>

<h2>3. Cấu trúc cơ bản của FSM trong Fusion</h2>
<h3>Thành phần chính:</h3>
<ol>
  <li><strong>StateMachineController:</strong>
    <ul>
      <li>Được thêm vào đối tượng game để quản lý và đồng bộ hóa trạng thái qua mạng.</li>
      <li>Đảm bảo tất cả client đều biết trạng thái hiện tại của đối tượng.</li>
    </ul>
  </li>
  <li><strong>StateMachine:</strong>
    <ul>
      <li>Lưu trữ danh sách các trạng thái.</li>
      <li>Xử lý logic chuyển đổi giữa các trạng thái thông qua các phương pháp như <code>TryActivateState</code> hoặc <code>ForceActivateState</code>.</li>
    </ul>
  </li>
  <li><strong>State:</strong>
    <ul>
      <li>Đại diện cho một trạng thái cụ thể và chứa logic liên quan.</li>
      <li>Kế thừa từ <code>StateBehaviour</code> để tích hợp với Photon Fusion.</li>
    </ul>
  </li>
</ol>
<hr>
<h2>3. Cách triển khai FSM</h2>
<p><strong>Cài đặt FSM trên đối tượng Player:</strong></p>
`,
  code: [
    {
      lang: 'csharp',
      value: `[RequireComponent(typeof(StateMachineController))]
public class PlayerController : NetworkBehaviour, IStateMachineOwner
{
    [SerializeField] private SkeletonAnimation skeletonAnimation;
    [SerializeField] private Rigidbody2D rigidbody2D;
    public float moveSpeed = 5f;
    public float jumpForce = 5f;
    public bool _isGrounded;

    private StateMachine<StateBehaviour> _stateMachine;

    public override void FixedUpdateNetwork()
    {
        if (!HasStateAuthority) return;

        if (_stateMachine.ActiveState is JumpState || _stateMachine.ActiveState is AttackState)
            return;

        // Chuyển trạng thái dựa trên đầu vào
        if (_isGrounded && Input.GetKey(KeyCode.Space))
            _stateMachine.TryActivateState<JumpState>();
        else if (_isGrounded && Input.GetKey(KeyCode.F))
            _stateMachine.TryActivateState<AttackState>();
        else
            _stateMachine.TryActivateState<IdleState>();
    }

    void IStateMachineOwner.CollectStateMachines(List<IStateMachine> stateMachines)
    {
        _stateMachine = new StateMachine<StateBehaviour>("PlayerFSM",
            GetComponent<IdleState>(),
            GetComponent<JumpState>(),
            GetComponent<AttackState>());
        stateMachines.Add(_stateMachine);
    }
}`
    },
    {
      lang: 'csharp',
      value: `public class IdleState : StateBehaviour
{
    private PlayerController _player;

    protected override void OnEnterState()
    {
        _player = GetComponent<PlayerController>();
        if (_player.HasStateAuthority)
            _player.RPC_SetAnimation("idle", true);
    }

    protected override void OnFixedUpdate()
    {
        if (Input.GetKey(KeyCode.Space))
            Machine.TryActivateState<JumpState>();
    }
}`
    },
    {
      lang: 'csharp',
      value: `public class JumpState : StateBehaviour
{
    private PlayerController _player;

    protected override void OnEnterState()
    {
        _player = GetComponent<PlayerController>();
        if (_player.HasStateAuthority)
        {
            _player.RPC_SetAnimation("jump", true);
            _player.rigidbody2D.AddForce(Vector2.up * _player.jumpForce, ForceMode2D.Impulse);
        }
    }

    protected override void OnFixedUpdate()
    {
        if (_player._isGrounded)
            Machine.TryActivateState<IdleState>();
    }
}`
    },
    {
      lang: 'csharp',
      value: `public class AttackState : StateBehaviour
{
    private PlayerController _player;

    protected override void OnEnterState()
    {
        _player = GetComponent<PlayerController>();
        if (_player.HasStateAuthority)
            _player.RPC_SetAnimation("attack", true);
    }

    protected override void OnFixedUpdate()
    {
        if (Machine.StateTime > 0.5f) // Hoàn thành hoạt ảnh tấn công
            Machine.TryActivateState<IdleState>();
    }
}`
    },
    {
      lang: 'csharp',
      value: `using UnityEngine;
using Fusion.Addons.FSM;

public class MoveState : StateBehaviour
{
    private PlayerController _player;

    protected override void OnEnterState()
    {
        _player = GetComponent<PlayerController>();
        if (_player.HasStateAuthority)
        {
            _player.RPC_SetAnimation("move", true); // Đồng bộ hoạt ảnh di chuyển cho tất cả client
        }
    }
    protected override void OnFixedUpdate()
    {
        if (!_player.HasStateAuthority || !GetInput(out _player._inputData))
            return;
        Vector2 moveDirection = new Vector2(_player._inputData.movement.x * _player.moveSpeed, _player.GetComponent<Rigidbody2D>().linearVelocity.y);
        _player.GetComponent<Rigidbody2D>().linearVelocity = moveDirection;

        if (!_player.HasMovementInput())
            Machine.TryActivateState<IdleState>();
        else if (_player.IsJumping())
            Machine.TryActivateState<JumpState>();
        else if (_player.IsAttacking())
            Machine.TryActivateState<AttackState>();   
    }
}`
    }
  ],

}