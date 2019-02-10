图解HTTP
===

> 专业名称都是人为规定，会有一定的道理。

第一章、了解Web和网络基础
---

- 网页浏览器（Web browser）
- 客户端（client）
- 文件资源（resource）
- HTTP（HyperText Transfer Protocol，超文本传输协议）
- WWW（World Wide Web，万维网）
- 超文本（HyperText）
- SGML（Standard Generalized Markup Language，标准通用标记语言）
- HTML（HyperText Markup Language，超文本标记语言）
- URI（Uniform Resource Identifier，统一资源标识符）
- URL（Uniform Resource Locator，统一资源定位符）
- NCSA（National Center For Supercomputer Applications，美国国家超级计算机应用中心）
- 协议（Protocol）
- FTP（File Transfer Protocol，文件传输协议）
- DNS（Domain Name System，域名系统）
- TCP（Transmission Control Protocol，传输控制协议）
- UDP（User Data Protocol，用户数据报协议）
- NIC（Network Interface Card，网络设配器，即网卡）
- 封装（encapsulate）
- IP（Internet Protocol，网际协议）
- Mac地址（Media Access Control Address）
- 局域网（LAN）
- ARP协议（Address Resolution Protocol）
- 路由选择（routing）
- 字节流服务（Byte Stream Service）
- 报文段（segment）
- 三次握手策略（three-way handshaking）
- 标志（flag）
- SYN（Synchronize）
- ACK（Acknowledge）
- ICANN（Internet Corporate For Assigned Names And Numbers，互联网名称和数字地址分配机构）
- IANA（Internet Assigned Numbers Authority，互联网号码分配局）
- RFC（Request For Comments，征求修正意见书）

第二章、简单的HTTP协议
---

- 方法（method）
- 请求URI（request-URI）
- 状态码（status code）
- 原因短语（reason-phrase）
- 首部字段（header field）
- 主体（entity body）
- 无状态（stateless）
- CGI（Common Gateway Interface，通用网关接口）
- REST（Representational State Transfer，表征状态转移）
- XST（Cross-Site Tracing，跨站追踪）
- SSL（Secure Sockets Layer，安全套接层）
- TLS（Transport Layer Security，传输层安全）
- 持久连接（HTTP persistent Connections，也称 HTTP keep-alive 或 HTTP connection reuse）
- 管线化（pipelining）

第三章、HTTP报文内的`HTTP`信息
---

- 字节流（octet sequence）
- 报文（message）
- 实体（entity）
- 分块传输编码（Chunked Transfer Coding）
- 传输编码（Transfer Coding）
- MIME（Multipurpose Internet Mail Extension，多用途因特网邮件拓展）
- 多部分对象集合（Multipart）
- 范围请求（Range Request）
- 内容协商（Content Negotiation）
- 服务器驱动协商（Server-driven Negotiation）
- 客户端驱动协商（Agent-driven Negotiation）
- 透明协商（Transparent Negotiation）

第四章、返回结果的HTTP状态码
---

- Informational（信息性状态码）
- Success（成功状态码）
- Redirection（重定向状态码）
- Client Error（客户端错误状态码）
- Service Error（服务器错误状态码）
- WebDAV（Web-based Distributed Authoring and Versioning，基于万维网的分布式创作和版本控制）
- 状态码200（OK，正常处理）
- 状态码204（No Content，没有资源可以返回）
- 状态码206（Partial Connect，部分内容）
- 状态码301（Moved Permanently，永久性重定向）
- 状态码302（Found，临时性重定向）
- 状态码303（See Other，资源的`URI`已经更新，是否能临时按新的`URI`访问）
- 状态码304（Not Modified，服务器资源未改变，可直接使用客户端未过期的缓存）
- 状态码307（Temporary Redirect，临时性重定向，会遵守浏览器标准，不会从`POST`变成`GET`）
- 状态码400（Bad Request，请求报文中存在语法错误）
- 状态码401（Unauthorized，发送的请求需要有通过HTTP认证、BASIC认证、DIGEST认证等信息）
- 质询（challenge）
- 状态码403（Forbidden，请求资源的访问被服务器拒绝）
- 状态码404（Not Found，服务器上没有请求的资源）
- 状态码500（Internet Service Error，服务器内部资源出故障，也可能是`Web应用`存在的`bug`或某些临时的故障）
- 状态码503（Service Unavailable，服务器暂时处于超负载或正在进行停机维护，现在无法处理请求）

第五章、与HTTP协作的`Web服务器`
---

- Web托管服务（Web Hosting Service）
- 虚拟主机（Virtual Host，虚拟服务器）
- 缓存代理（Caching Proxy）
- 透明代理（Transparent Proxy）
- NNTP（Network News Transfer Protocol，用于 `NetNews` 电子会议室内传送消息的协议【不常用】）
- Archie（搜索 `anonymous FTP` 公开的文件信息的协议【不常用】）
- WAIS（Wide Area Information Servers，以关键词搜索多个数据库使用的协议【不常用】）
- Gopher（查找与互联网连接的计算机内信息的协议【不常用】）