<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Test</title>
	<script src="/js/jquery-3.6.4.min.js"></script>
	<script>
		$(document).ready(function() {
			
		});
	</script>
</head>
<body>
	<form action="/meeting/test/login">
		아이디 <input type="text" name="id"><br>
		<input type="submit" value="LOGIN" id="login"><br>	
	</form>
	<input type="button" value="LOGOUT" id="logout" onclick="location.href='/meeting/test/logout'">
	<h1>로그인 여부</h1>
	<h3>${ session_id }</h3>
	<hr>
	
	<!-- <a href="/meeting/test/random">랜덤 부여</a> -->
</body>
</html>