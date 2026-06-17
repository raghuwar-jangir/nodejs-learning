const domain = "http://localhost:8080/";

const url = new URL(domain);

url.pathname = "users";
url.search = "type=student&role_no=22";

const finalUrl = url.toString();
