<template>
  <TemplateBlog
    title="Xây dựng JSON Web APIs với ASP.NET MVC 4 và ASP.NET Web API"
    cover="https://placehold.co/800x300?text=ASP.NET+API"
    author="Dương"
    authorAvatar="https://placehold.co/80x80"
    date="2015-03-25"
    :toc="['Giới thiệu', 'Các tính năng mới', 'Kết luận']"
    warning="Bài đăng này đã không được cập nhật trong 10 năm"
    :barge="['C#', 'ASP.NET']"
  >
    <!-- Nội dung bài viết viết HTML chay ở đây -->
    <p>Dưới đây là một số trong những thứ đó là được cải thiện trong MVC 4.</p>

    <CodeConvert :code="`// Controller mẫu cho ASP.NET Web API
public class ValuesController : ApiController {
  public IEnumerable<string> Get() {
    return new string[] { 'value1',
`" />
    <ul>
      <li>Làm mới và hiện đại hóa các mẫu dự án mặc định</li>
      <li>Mẫu dự án trên điện thoại di động</li>
    </ul>
    <!-- Cuối bài viết -->
    <RelatedBlogList
      :author="'Dương'"
      :related="relatedPosts"
      :others="otherPosts"
    />
  </TemplateBlog>
</template>

<script setup>
import TemplateBlog from '../Service/TemplateBlog.vue';
import RelatedBlogList from '../Components/RelatedBlogList.vue';
import CodeConvert from '../Service/CodeConvert.vue';
import Barge from '../Components/Barge.vue'; // Đảm bảo đúng đường dẫn

const relatedPosts = [
  { id: 1, title: 'Series ASP.NET MVC - Part 3: Sử dụng ViewModel', author: 'Don Nguyen', time: '2 phút đọc', views: '10.0K', comments: 4, bookmarks: 7, likes: 3 },
  { id: 2, title: 'Kiểu dữ liệu Tuple trong C#', author: 'khoa', time: '4 phút đọc', views: '4.7K', comments: 4, bookmarks: 1, likes: 3 },
  { id: 3, title: 'Code Review: .NET Application Performance', author: 'Alphongso TrầnAn DũngLạc', time: '6 phút đọc', views: 384, comments: 2, bookmarks: 0, likes: 0 },
  { id: 4, title: 'C# advanced-Part 1: Introduction', author: 'Mahmud Rahman', time: '1 phút đọc', views: '1.3K', comments: 2, bookmarks: 0, likes: 1 },
];
const otherPosts = [
  { id: 5, title: 'ASP.NET MVC Tip #31 – Truyền dữ liệu đến Master...', author: 'Dương', time: '4 phút đọc', views: 861, comments: 1, bookmarks: 0, likes: 0 },
  { id: 6, title: 'ASP.NET MVC Tip #30 – Tạo ràng buộc Custom Route', author: 'Dương', time: '8 phút đọc', views: '1.4K', comments: 0, bookmarks: 2, likes: 2 },
  { id: 7, title: 'ASP.NET MVC Tip #29 – Xây dựng Controller cho Debug...', author: 'Dương', time: '4 phút đọc', views: 242, comments: 0, bookmarks: 0, likes: 0 },
  { id: 8, title: 'ASP.NET MVC Tip #29 – Xây dựng Controller cho Debug...', author: 'Dương', time: '4 phút đọc', views: 263, comments: 0, bookmarks: 0, likes: 1 },
];
</script>