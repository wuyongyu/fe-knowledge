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
- 状态码401（Unauthorized，发送的请求需要有通过HTTP认证、BASIC基本认证、DIGEST摘要认证等信息）
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

第六章、HTTP首部
---

- 通用首部字段（General Header Fields）
- 请求首部字段（Request Header Fields）
- 响应首部字段（Response Header Fields）
- 实体首部字段（Entity Header Fields）

> 通用首部字段

- Cache-Control（控制缓存的行为）
- Connection（逐跳首部、连接的管理）
- Date（创建报文的日期时间）
- Pragma（报文指令）
- Trailer（报文末端的首部一览）
- Trailer-Encoding（指定报文主体的传输编码方式）
- Upgrade（升级为其他协议）
- Via（代理服务器的相关信息）
- Warning（错误通知）

> 请求首部字段

- Accept（用户代理可处理的媒体类型）
- Accept-Charset（优先的字符集）
- Accept-Encoding（优先的内容编码）
- Accept-language（优先的语言【自然语言】）
- Authorization（Web认证信息）
- Expect（期待服务器的特定行为）
- From（用户的电子邮箱地址）
- Host（请求资源所在的服务器）
- If-Match（比较实体标记【ETag】）
- If-None-Match（比较实体标记【与If-Match相反】）
- If-Modified-Since（比较资源的更新时间）
- If-Unmodified-Since（比较资源的更新时间【与If-Modified-Since相反】）
- Range（实体的字节范围请求）
- If-Range（资源未更新时发送实体Byte的范围请求）
- Max-Forwards（最大传输逐跳数）
- Proxy-Authorization（代理服务器要求客户端的认证信息）
- Referer（对请求中URL的原始获取方）【在`RFC2616`有相关的讨论，这个单词被拼错了，正确的拼写应该是`referrer`】
- TE（传输编码的优先级）
- User-Agent（HTTP客户端程序的信息）

> 响应首部字段

- Accept-Ranges（是否接受字节范围请求）
- Age（推算资源创建经过时间）
- ETag（资源的匹配信息）
- Location（令客户端重定向至指定URI）
- Proxy-Authenticate（代理服务器对客户端的认证信息）
- Retry-After（对再次发起请求的时机要求）
- Server（HTTP服务器的安装信息）
- Vary（代理服务器缓存的管理信息）
- WWW-Authenticate（服务器对客户端的认证信息）

> 实体首部字段

- Allow（资源可支持的HTTP方法）
- Content-Encoding（实体主体适用的编码方式）
- Content-Language（实体主体的自然语言）
- Content-Length（实体主体的大小【单位：字节】）
- Content-Location（替代对应资源的URI）
- Content-MD5（实体主体的报文摘要）
- Content-Range（实体主体的位置范围）
- Content-Type（实体主体的媒体类型）
- Expires（实体主体过期的日期时间）
- Last-Modified（资源最后修改日期时间）

---

- 端到端首部（End-to-end Header）
- 逐跳首部（Hop-by-hop Header）
- 会话（session）
- 跨站脚本攻击（Cross-site scripting，XSS）
- 点击劫持攻击（clickjacking）
- 同源域名下的页面（Top-level-browsing-context）
- DNT（Do Not Track，拒绝个人信息被收集）
- P3P（The Platform for Privacy Preferences，在线隐私偏好平台）

第七章、确保Web安全的`HTTPS`
---

- 抓包（Packet Capture）
- 嗅探器工具（Sniffer）
- HTTPS（HTTP Secure，超文本传输安全协议【HTTP over SSL】）
- DoS攻击（Denial of Service，拒绝服务攻击）
- 中间人攻击（Man-in-the-Middle attack，MITM）
- PGP（Pretty Good Privacy，完美隐私）

> HTTP加上加密处理和认证以及完整性保护后即是`HTTPS`

- 公开密钥加密（Public-key cryptography）
- 共享密钥加密（Common key crypto system，也叫对称密钥加密）
- 私有密钥（private key）
- 公开密钥（public key）
- 数字证书认证机构（CA，Certificate Authority）
- EV SSL证书（Extended Validation SSL Certificate）
- 钓鱼攻击（Phishing）
- 证书吊销列表（Certificate Revocation List，CRL）
- 根证书颁布机构（Root Certificate Authority，RCA）
- CBC模式（Cipher Block Chaining，密码分组链接模式）
- MAC（Message Authentication Code）
- IETF（Internet Engineering Task Force，Internet工程任务组）

第八章、确认访问用户身份的认证
---

- 双因素认证（Two-factor authentication）
- 登录信息（Credential）
- 会话（Session）

第九章、基于HTTP的功能追加协议
---

- SNS（Social Network Service，社交网络服务）
- SPDY（取自SPeeDY，发音同speedy）
- Ajax（Asynchronous JavaScript and XML，异步`JavaScript`与`XML`技术）
- DOM（Document Object Model，文档对象模型）
- 集合（Collection）
- 资源（Resource）
- 属性（Property）
- 锁（Lock）

第十章、构建Web内容的技术
---

- W3C（World Wide Web Consortium）
- CSS（Cascading Style Sheets，层叠样式表）
- API（Application Programming Interface，应用程序接口）
- 互联网（Internet）
- 企业内网（Intranet）
- 企业级Java（JavaEE，Java Enterprise Edition）
- XML（eXtensible Markup Language，可拓展标记语言）
- 语法分析器（Parser）
- RSS（简易信息聚合）
- JSON（JavaScript Object Notation）

第十一章、Web的攻击技术
---

- 主动攻击（active attack）
- 被动攻击（passive attack）
- SQL注入（SQL Injection）
- 关系型数据库管理系统（Relational DataBase Management System，RDBMS）
- OS命令注入攻击（OS Command Injection）
- HTTP首部注入攻击（HTTP Header Injection）
- HTTP响应截断攻击（HTTp Response Splitting Attack）
- 邮箱首部注入（Mail Header Injection）
- 目录遍历（Directory Traversal）
- 路径遍历（Path Traversal）
- 远程文件包含漏洞（Remote File Inclusion）
- 强制浏览（Forced Browsing）
- 不正确的错误信息处理（Error Handing Vulnerability）
- 开放重定向（Open Redirect）
- 会话劫持（Session Hijack）
- 会话固定攻击（Session Fixation）
- 跨站点请求伪造（Cross-site Request Forgeries，CSRF）
- 密码破解（Password Cracking）
- 穷举法（Brute-force Attack，又称暴力破解法）
- 秘钥空间（Keyspace）
- 彩虹表（Rainbow Table）
- 界面伪装（UI Redressing）
- DoS攻击（Denial of Service attack）
- DDos攻击（Distributed Denial of Service attack）
- 后门程序（Backdoor）