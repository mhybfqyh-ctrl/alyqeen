/* =====================================================
   تطبيق اليقين
   JavaScript الأساسي
   ===================================================== */

"use strict";

/* =========================
   قاعدة البيانات المحلية
   ========================= */

const STORAGE_KEY = "alyqeen_records_v1";

let records = [];

try {
  records = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );

  if (!Array.isArray(records)) {
    records = [];
  }
} catch (error) {
  records = [];
}


/* =========================
   عناصر الصفحة
   ========================= */

const peopleCount = document.getElementById("peopleCount");
const facilityCount = document.getElementById("facilityCount");
const totalCount = document.getElementById("totalCount");
const recordsList = document.getElementById("recordsList");


/* =========================
   حفظ البيانات
   ========================= */

function saveRecords() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(records)
  );
}


/* =========================
   تحديث الإحصائيات
   ========================= */

function updateStats() {

  const people = records.filter(
    record => record.type === "person"
  ).length;

  const facilities = records.filter(
    record => record.type === "facility"
  ).length;

  peopleCount.textContent = people;
  facilityCount.textContent = facilities;
  totalCount.textContent = records.length;
}


/* =========================
   عرض السجلات
   ========================= */

function renderRecords() {

  if (!records.length) {

    recordsList.innerHTML = `
      <p class="empty">
        لا توجد سجلات حتى الآن
      </p>
    `;

    return;
  }

  recordsList.innerHTML = records
    .slice()
    .reverse()
    .map(record => {

      const icon =
        record.type === "person"
          ? "👤"
          : "🏢";

      const title =
        record.name ||
        record.title ||
        "سجل بدون اسم";

      return `
        <div
          style="
            background:#fff;
            border:1px solid #e3e8e5;
            border-radius:20px;
            padding:16px;
            box-shadow:0 8px 20px rgba(23,63,53,.06);
          "
        >

          <div
            style="
              display:flex;
              align-items:center;
              gap:12px;
            "
          >

            <div
              style="
                width:44px;
                height:44px;
                border-radius:14px;
                background:#eef4f1;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:21px;
              "
            >
              ${icon}
            </div>

            <div>

              <strong
                style="
                  display:block;
                  color:#173f35;
                  font-size:16px;
                "
              >
                ${escapeHTML(title)}
              </strong>

              <small
                style="
                  display:block;
                  margin-top:4px;
                  color:#75817d;
                "
              >
                ${
                  record.type === "person"
                    ? "شخص"
                    : "منشأة"
                }
              </small>

            </div>

          </div>

        </div>
      `;
    })
    .join("");
}


/* =========================
   إضافة شخص
   ========================= */

function addPerson() {

  const name = prompt(
    "أدخل الاسم الرباعي:"
  );

  if (name === null) {
    return;
  }

  const cleanName = name.trim();

  if (!cleanName) {
    alert("يرجى إدخال الاسم.");
    return;
  }

  const record = {

    id: Date.now(),

    type: "person",

    name: cleanName,

    createdAt:
      new Date().toISOString()

  };

  records.push(record);

  saveRecords();

  updateStats();

  renderRecords();

  alert("تمت إضافة الشخص بنجاح.");
}


/* =========================
   إضافة منشأة
   ========================= */

function addFacility() {

  const name = prompt(
    "أدخل اسم المنشأة:"
  );

  if (name === null) {
    return;
  }

  const cleanName = name.trim();

  if (!cleanName) {
    alert("يرجى إدخال اسم المنشأة.");
    return;
  }

  const record = {

    id: Date.now(),

    type: "facility",

    title: cleanName,

    createdAt:
      new Date().toISOString()

  };

  records.push(record);

  saveRecords();

  updateStats();

  renderRecords();

  alert("تمت إضافة المنشأة بنجاح.");
}


/* =========================
   حماية عرض النصوص
   ========================= */

function escapeHTML(value) {

  return String(value)

    .replaceAll("&", "&amp;")

    .replaceAll("<", "&lt;")

    .replaceAll(">", "&gt;")

    .replaceAll('"', "&quot;")

    .replaceAll("'", "&#039;");
}


/* =========================
   تشغيل التطبيق
   ========================= */

function initializeApp() {

  updateStats();

  renderRecords();

  console.log(
    "تم تشغيل تطبيق اليقين بنجاح."
  );
}


initializeApp();
