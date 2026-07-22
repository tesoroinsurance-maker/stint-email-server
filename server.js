// STINT 2026 챗봇 - 관리자 비밀번호 이메일 발송 서버 (Gmail SMTP 버전)
// nodemailer + Gmail 앱 비밀번호를 사용합니다. 완전 무료 (하루 500통 한도).

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors()); // 챗봇 아티팩트 도메인에서의 요청을 허용

const PORT = process.env.PORT || 3000;

// 보내는 사람 Gmail 계정 정보 (환경변수로 설정)
const GMAIL_USER = process.env.GMAIL_USER; // 예: yourname@gmail.com
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD; // 16자리 앱 비밀번호

// 관리자 코드 및 수신자는 서버에만 고정 보관 (클라이언트에서 값을 받지 않음 — 보안 목적)
const ADMIN_CODE = "STINT26-Qna-7Kx2";
const RECIPIENT = "tesoro319@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

app.post("/send-admin-code", async (req, res) => {
  try {
    await transporter.sendMail({
      from: `"STINT 2026" <${GMAIL_USER}>`,
      to: RECIPIENT,
      subject: "[STINT 2026] 관리자 접속코드 안내",
      text: `관리자 접속코드: ${ADMIN_CODE}\n\n본인 확인 후 이 코드로 관리자 화면에 로그인하세요.`,
    });
    res.json({ ok: true });
  } catch (e) {
    console.error("이메일 발송 오류:", e);
    res.status(500).json({ ok: false, error: "이메일 발송에 실패했습니다." });
  }
});

app.get("/", (req, res) => res.send("STINT 2026 이메일 발송 서버가 정상 동작 중입니다 (Gmail SMTP)."));

app.listen(PORT, () => console.log(`서버 실행 중: 포트 ${PORT}`));
