# Review kinh nghiệm làm việc — Dự án nền tảng dữ liệu và BI

> Bản nội dung này được tổng hợp từ mã nguồn, cấu hình, kiểm thử và tài liệu hiện có trong dự án. Các số liệu về người dùng, thời gian tiết kiệm, hiệu năng hoặc tác động kinh doanh chưa có bằng chứng trong repository nên không được tự suy diễn.

## 1. Tôi đã làm được gì

- Tham gia xây dựng một **nền tảng dữ liệu và Business Intelligence end-to-end**, bao gồm cổng quản trị web, hệ thống API, pipeline xử lý dữ liệu, cơ chế điều phối refresh và lớp báo cáo Power BI.
- Xây dựng luồng dữ liệu theo **Medallion Architecture** gồm Bronze, Silver và Gold trên Azure; tổ chức quá trình ingest, làm sạch, chuẩn hóa và chuyển đổi dữ liệu thành các bảng phục vụ phân tích.
- Phát triển và cấu hình pipeline bằng **Azure Data Factory, Azure Databricks và PySpark** để tích hợp dữ liệu từ REST API, SQL Server, CDC, Excel, Google Sheets và Azure Storage; hỗ trợ full snapshot, bootstrap và incremental load theo checkpoint/LSN.
- Phát triển backend bằng **NestJS, TypeScript, TypeORM và PostgreSQL**, cung cấp REST API cho quản trị cấu hình, pipeline, lượt chạy, trigger, lưu trữ, người dùng, phân quyền, báo cáo và các quy trình nhập liệu nghiệp vụ.
- Thiết kế cơ chế **refresh orchestration** theo dependency: chạy tuần tự giữa Bronze, Silver, Gold và chạy song song các pipeline độc lập trong cùng một lớp dữ liệu.
- Tăng độ tin cậy của quá trình orchestration bằng PostgreSQL advisory lock, worker lease, `FOR UPDATE SKIP LOCKED`, chống tạo lượt chạy trùng, hủy tác vụ, retry, theo dõi trạng thái từng bước và ước tính thời gian hoàn thành từ dữ liệu lịch sử.
- Áp dụng **transactional outbox** để đồng bộ an toàn dữ liệu nhập tại PostgreSQL sang Gold layer; hỗ trợ versioning, soft delete, retry, bulk sync và snapshot synchronization.
- Xây dựng các luồng nhập liệu phục vụ nghiệp vụ **Cashflow, Marketing KPI và AOP**, gồm form nghiệp vụ, phân quyền, tra cứu, lọc, phân trang, kiểm tra dữ liệu và đồng bộ xuống kho dữ liệu.
- Xử lý mô hình dữ liệu tài chính cho khoản vay, giải ngân, trả nợ, thay đổi lãi suất, tiền gửi, tài sản bảo đảm, LC, bảo lãnh, hợp đồng nhà cung cấp, giao dịch ngoại tệ và kế hoạch dòng tiền.
- Phát triển **Dashboard Builder theo metadata**, hỗ trợ semantic model, field binding, nhiều trang báo cáo, visual, canvas editor, validation và cấu hình hiển thị.
- Xây dựng bộ sinh artifact **PBIP/PBIR** từ metadata của dashboard, gồm cấu trúc project, report, page và visual; ánh xạ visual sang loại native của Power BI và cảnh báo các trường hợp cần fallback.
- Tài liệu hóa lineage và logic chuyển đổi của **73 Power BI query/table**, trong đó có 22 nguồn API/Web, 37 bảng model/dashboard cùng các bảng staging và helper; phân tích dependency và tái hiện logic Power Query/M cho các báo cáo Finance, Sales, Inventory và AOP.
- Xây dựng Azure Function cho thao tác refresh dashboard, xác thực bearer token qua **Microsoft Entra ID**, kiểm tra input, gắn correlation ID và chuẩn hóa lỗi trả về.
- Phát triển công cụ kiểm kê dữ liệu Bronze trên Azure Blob Storage: nhóm file thành dataset, nhận diện định dạng, tổng hợp dung lượng, suy luận schema CSV/JSON/Parquet và gợi ý watermark hoặc business key để chuyên gia dữ liệu xác nhận.
- Áp dụng các biện pháp bảo mật tại biên hệ thống: CORS allowlist, kiểm tra cấu hình production khi khởi động, DTO validation, JWT/JWKS, phân quyền report/page, giới hạn input và quản lý thông tin kết nối qua environment hoặc Azure Key Vault.
- Xây dựng kiểm thử cho backend, frontend, Azure Function và các script xử lý dữ liệu; bao phủ các luồng orchestration, migration, bảo mật, CDC, snapshot, transformation, Power BI artifact và đồng bộ Gold.

## 2. Kết quả đã đạt được

- Hình thành được luồng dữ liệu thống nhất từ **nguồn dữ liệu → Bronze → Silver → Gold → Power BI/ứng dụng nghiệp vụ**, giúp các thành phần frontend, backend và data platform hoạt động theo cùng một mô hình.
- Chuyển nhiều quy trình xử lý và refresh dữ liệu từ thao tác rời rạc sang cơ chế **cấu hình và điều phối tập trung**, có trạng thái, lịch chạy, lịch sử, retry và thông tin lỗi để theo dõi.
- Tăng tính ổn định khi nhiều tác vụ chạy đồng thời nhờ cơ chế lock, lease và chống trùng; hạn chế xung đột giữa các lượt refresh tổng và refresh theo miền dữ liệu.
- Bảo đảm thay đổi dữ liệu nghiệp vụ và sự kiện đồng bộ được ghi trong cùng transaction, giảm nguy cơ dữ liệu PostgreSQL và Gold layer không nhất quán.
- Hỗ trợ cả đồng bộ từng bản ghi, đồng bộ hàng loạt và full snapshot; theo dõi được trạng thái pending, queued, synced hoặc failed và cho phép chạy lại khi lỗi.
- Tạo nền tảng nhập liệu có kiểm soát cho các nghiệp vụ tài chính và KPI thay vì phụ thuộc hoàn toàn vào file thủ công; dữ liệu sau nhập có thể tiếp tục đi qua pipeline và phục vụ báo cáo.
- Chuẩn hóa lineage của 73 Power BI query/table, giúp truy vết nguồn, dependency và logic biến đổi dữ liệu rõ ràng hơn khi bảo trì hoặc chuyển đổi nguồn.
- Tự động hóa việc chuyển metadata dashboard thành cấu trúc PBIP/PBIR, giảm thao tác tạo thủ công các artifact report, page và visual, đồng thời phát hiện sớm visual chưa được hỗ trợ đầy đủ.
- Cải thiện khả năng vận hành nhờ telemetry theo run/step, phần trăm tiến độ, thời lượng chờ, thời lượng thực thi, cảnh báo stale, tổng hợp lỗi và ETA dựa trên lịch sử.
- Thiết lập các lớp bảo vệ cần thiết cho hệ thống doanh nghiệp: xác thực Entra ID, phân quyền theo người dùng/phòng ban/report, validation tại API boundary và không đưa credential vào frontend hoặc Power BI visual.
- Tạo bộ kiểm thử ở nhiều lớp để kiểm tra business logic, pipeline definition, migration, orchestration và data transformation trước khi thay đổi được đưa vào môi trường vận hành.

## 3. Tự đánh giá bản thân

### Điểm mạnh

- Tôi có khả năng nhìn bài toán theo hướng **end-to-end**, từ yêu cầu nghiệp vụ, mô hình dữ liệu, pipeline xử lý, backend API đến giao diện và báo cáo BI.
- Tôi có thể kết nối kiến thức **Software Engineering, Data Engineering và Business Intelligence** để giải quyết bài toán thay vì chỉ tập trung vào một lớp công nghệ riêng lẻ.
- Tôi chú trọng độ tin cậy của hệ thống: xử lý concurrency, idempotency, retry, transaction, trạng thái đồng bộ, logging và khả năng truy vết lỗi.
- Tôi có khả năng phân tích nghiệp vụ tài chính tương đối phức tạp và chuyển hóa thành schema, mapping, transformation, API và giao diện nhập liệu có cấu trúc.
- Tôi làm việc theo hướng metadata/config-driven, ưu tiên giải pháp có thể mở rộng và tái sử dụng thay vì hardcode từng pipeline hoặc từng dashboard.
- Tôi có ý thức về bảo mật dữ liệu và quyền truy cập, đặc biệt tại các điểm tích hợp giữa web application, API, Azure services, database và Power BI.
- Tôi chủ động viết tài liệu lineage, checklist và kiểm thử để kiến thức kỹ thuật không chỉ tồn tại trong mã nguồn và giúp việc bàn giao, bảo trì thuận lợi hơn.
- Tôi có khả năng tự học và làm việc với nhiều công nghệ trong cùng hệ sinh thái, đồng thời vẫn giữ được luồng dữ liệu và hợp đồng giữa các thành phần nhất quán.

### Điểm cần tiếp tục cải thiện

- Tôi cần đo lường rõ hơn tác động sau triển khai bằng các KPI như thời gian xử lý, tỷ lệ lỗi, số giờ thủ công tiết kiệm, độ trễ dữ liệu và số người dùng thực tế.
- Tôi cần tiếp tục ưu tiên phạm vi theo giá trị kinh doanh để tránh phân tán nguồn lực khi hệ thống có nhiều miền dữ liệu và nhiều hướng phát triển song song.
- Tôi cần tăng độ hoàn thiện của kiểm thử tích hợp và E2E cho các luồng quan trọng, đồng thời theo dõi coverage bằng số liệu thay vì chỉ dựa trên số lượng test hiện có.
- Tôi cần tiếp tục chuẩn hóa monitoring, alerting, runbook và tiêu chí SLO/SLA để vận hành production chủ động hơn.
- Tôi cần đào sâu thêm về tối ưu chi phí và hiệu năng cloud khi khối lượng dữ liệu, số pipeline và tần suất refresh tăng.

## Bản rút gọn để đưa vào CV

- Xây dựng nền tảng dữ liệu và BI end-to-end trên Azure theo Medallion Architecture, kết nối REST API, SQL Server/CDC, Excel, Google Sheets và Azure Storage qua ADF, Databricks và PySpark.
- Phát triển backend NestJS/PostgreSQL và cổng quản trị Next.js cho cấu hình pipeline, giám sát lượt chạy, phân quyền, báo cáo Power BI và các quy trình nhập liệu nghiệp vụ.
- Thiết kế refresh orchestration có dependency, parallel execution, advisory lock, worker lease, chống trùng, retry, cancellation, telemetry và ETA.
- Áp dụng transactional outbox, versioning, soft delete và snapshot synchronization để đồng bộ dữ liệu nhập tay sang Gold layer an toàn và có thể chạy lại.
- Xây dựng các giải pháp nhập liệu và xử lý dữ liệu cho Cashflow, Marketing KPI, AOP cùng nhiều nghiệp vụ tài chính như khoản vay, tiền gửi, tài sản bảo đảm, LC và bảo lãnh.
- Phát triển Dashboard Builder theo metadata và bộ sinh PBIP/PBIR, hỗ trợ semantic model, field binding, visual mapping, validation và xuất cấu trúc báo cáo Power BI.
- Tài liệu hóa lineage và logic Power Query/M cho 73 query/table Power BI, gồm 22 nguồn API/Web và 37 bảng model/dashboard phục vụ Finance, Sales, Inventory và AOP.
- Triển khai xác thực Microsoft Entra ID, JWT/JWKS, phân quyền theo report/page, input validation, CORS allowlist và quản lý credential qua environment/Key Vault.
- Xây dựng kiểm thử cho API, orchestration, migration, CDC, snapshot, data transformation và Power BI artifact nhằm tăng khả năng bảo trì và giảm lỗi khi thay đổi.

## Thông tin cần bổ sung trước khi dùng chính thức

Chỉ bổ sung các mục sau khi có số liệu hoặc bằng chứng thực tế:

- **Chức danh:** [Data Engineer / Full-stack Engineer / BI Engineer / vai trò phù hợp]
- **Thời gian tham gia:** [MM/YYYY – MM/YYYY]
- **Vai trò cá nhân và phạm vi sở hữu:** [phần trực tiếp phụ trách]
- **Quy mô:** [số nguồn dữ liệu, pipeline hoạt động, dashboard, người dùng]
- **Hiệu quả:** [thời gian xử lý trước/sau, số giờ thủ công giảm, tỷ lệ lỗi giảm]
- **Trạng thái triển khai:** [POC / UAT / production]
