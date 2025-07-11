export default {
  id: 9,
  title: '🕹️ Xây Dựng Joystick Tùy Chỉnh Trong Unity (C#) – Hướng Dẫn & Source Code',
  cover: 'https://i.pinimg.com/736x/1b/25/8f/1b258f729a45ffa5b2bd7a9365b9e88e.jpg',
  author: 'Nguyễn Văn Mạnh',
  authorAvatar: 'https://avatars.githubusercontent.com/u/199482290?v=4',
  date: '15/07/2025 8:00 SA',
  topic: 'Unity, Joystick, Mobile UI',
  toc: [
    'Joystick là gì?',
    'Tại sao nên tự làm Joystick?',
    'Phân tích code Joystick',
    'Các chế độ Joystick',
    'Cách sử dụng & mở rộng',
    'Tài liệu tham khảo',
    'Đóng góp',
    'Liên hệ'
  ],
  warning: '',
  barge: ['Unity', 'Joystick', 'Mobile', 'UI', 'Input'],
  content: `
<h1>🕹️ Xây Dựng Joystick Tùy Chỉnh Trong Unity (C#)</h1>
<hr>
<h2>Joystick là gì?</h2>
<blockquote>
  <b>Joystick</b> là một thành phần UI điều khiển chuyển động phổ biến trên mobile game, cho phép người chơi điều khiển nhân vật hoặc camera bằng thao tác kéo/thả trên màn hình cảm ứng.
</blockquote>
<hr>
<h2>Tại sao nên tự làm Joystick?</h2>
<ul>
  <li><b>Chủ động tuỳ biến:</b> Dễ dàng thay đổi giao diện, logic, hiệu ứng theo ý muốn.</li>
  <li><b>Hiểu rõ nguyên lý:</b> Tự code giúp bạn hiểu sâu về hệ thống input, event, và UI của Unity.</li>
  <li><b>Không phụ thuộc package ngoài:</b> Giảm rủi ro lỗi, dễ bảo trì.</li>
</ul>
<hr>
<h2>Phân tích code Joystick</h2>
<ul>
  <li><b>Thành phần chính:</b>
    <ul>
      <li><code>handle</code>: Nút tròn di chuyển theo ngón tay.</li>
      <li><code>background</code>: Vùng nền joystick.</li>
      <li><code>deadZone</code>: Ngưỡng tối thiểu để nhận input (chống rung nhẹ tay).</li>
      <li><code>joystickMode</code>: Chế độ hoạt động (tự do, chỉ ngang, chỉ dọc).</li>
    </ul>
  </li>
  <li><b>Input & Event:</b>
    <ul>
      <li>Implements <code>IDragHandler</code>, <code>IEndDragHandler</code>, <code>IBeginDragHandler</code>, <code>IPointerUpHandler</code> để nhận sự kiện kéo/thả.</li>
      <li><b>InputVector</b>: Vector kết quả, trả về <code>Vector2.zero</code> nếu nhỏ hơn <code>deadZone</code>.</li>
      <li><b>OnInputChanged</b>: Sự kiện callback khi input thay đổi.</li>
      <li><b>OnReleased</b>: Sự kiện callback khi nhả joystick.</li>
    </ul>
  </li>
  <li><b>Logic chính:</b>
    <ul>
      <li>Khi kéo, vị trí handle được tính toán theo bán kính nền, clamp trong phạm vi tròn.</li>
      <li>Chế độ Joystick sẽ giới hạn trục X hoặc Y nếu cần.</li>
      <li>Khi thả tay, joystick tự động reset về giữa.</li>
    </ul>
  </li>
</ul>
<hr>
<h2>Các chế độ Joystick</h2>
<ul>
  <li><b>Free:</b> Xoay 360°, dùng cho di chuyển tự do (nhân vật, camera...)</li>
  <li><b>Horizontal:</b> Chỉ nhận trục X (trái/phải), dùng cho game runner, xe hơi...</li>
  <li><b>Vertical:</b> Chỉ nhận trục Y (lên/xuống), dùng cho game nhảy, leo thang...</li>
</ul>
<hr>
<h2>Cách sử dụng & mở rộng</h2>
<ul>
  <li>Thêm script vào một GameObject UI, kéo thả <code>handle</code> và <code>background</code> từ Canvas.</li>
  <li>Đăng ký sự kiện <code>OnInputChanged</code> để nhận input và điều khiển nhân vật.</li>
  <li>Có thể thay đổi <code>deadZone</code> hoặc <code>joystickMode</code> lúc runtime.</li>
  <li>Dễ dàng mở rộng: Thêm hiệu ứng, rung, hoặc tuỳ biến giao diện.</li>
</ul>
<hr>
<h2>Tài liệu tham khảo</h2>
<ul>
  <li><a href="https://docs.unity3d.com/ScriptReference/EventSystems.IDragHandler.html" target="_blank">Unity Docs: IDragHandler</a></li>
  <li><a href="https://learn.unity.com/tutorial/joystick" target="_blank">Unity Learn: Joystick Tutorial</a></li>
  <li><a href="https://www.youtube.com/results?search_query=unity+joystick+mobile" target="_blank">YouTube: Unity Joystick Mobile</a></li>
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
      file: 'Joystick.cs',
      lang: 'csharp',
      value: `using UnityEngine;
using UnityEngine.EventSystems;
using System;

namespace EternalFlame
{
    public enum JoystickMode
    {
        Free,       // Xoay 360 độ
        Horizontal, // Chỉ trục X
        Vertical    // Chỉ trục Y
    }

    [RequireComponent(typeof(CanvasGroup))]
    public class Joystick : MonoBehaviour, IDragHandler, IEndDragHandler, IBeginDragHandler, IPointerUpHandler
    {
        [Header("Joystick UI")]
        [SerializeField] private RectTransform handle;
        [SerializeField] private RectTransform background;

        [Header("Joystick Settings")]
        [SerializeField] private float deadZone = 0.1f;
        [SerializeField] private JoystickMode joystickMode = JoystickMode.Free;

        [Header("Debug")]
        [SerializeField] private Vector2 debugInputVector;

        private Vector2 inputVector = Vector2.zero;
        private float radius;

        public Vector2 InputVector => inputVector.magnitude < deadZone ? Vector2.zero : inputVector;

        public event Action<Vector2> OnInputChanged;
        public event Action OnReleased;

        private void Start()
        {
            radius = background.sizeDelta.x * 0.5f;
        }

        public void OnBeginDrag(PointerEventData eventData)
        {
            UpdateJoystickPosition(eventData);
        }

        public void OnDrag(PointerEventData eventData)
        {
            UpdateJoystickPosition(eventData);
        }

        public void OnEndDrag(PointerEventData eventData)
        {
            ResetJoystick();
        }

        public void OnPointerUp(PointerEventData eventData)
        {
            ResetJoystick();
            OnReleased?.Invoke();
        }

        private void UpdateJoystickPosition(PointerEventData eventData)
        {
            if (!RectTransformUtility.ScreenPointToLocalPointInRectangle(background, eventData.position, eventData.pressEventCamera, out Vector2 localPoint))
                return;

            // Chuyển thành input vector theo bán kính
            Vector2 rawInput = localPoint / radius;
            rawInput = Vector2.ClampMagnitude(rawInput, 1f);

            switch (joystickMode)
            {
                case JoystickMode.Horizontal:
                    rawInput.y = 0f;
                    break;
                case JoystickMode.Vertical:
                    rawInput.x = 0f;
                    break;
            }

            inputVector = rawInput;
            debugInputVector = inputVector;

            handle.anchoredPosition = inputVector * radius;

            OnInputChanged?.Invoke(InputVector);
        }

        private void ResetJoystick()
        {
            inputVector = Vector2.zero;
            debugInputVector = Vector2.zero;
            handle.anchoredPosition = Vector2.zero;
        }

        // Cho phép set lại deadZone hoặc mode runtime
        public void SetDeadZone(float newDeadZone) => deadZone = Mathf.Clamp01(newDeadZone);
        public void SetJoystickMode(JoystickMode mode) => joystickMode = mode;
    }
}
`
    }
  ]
}