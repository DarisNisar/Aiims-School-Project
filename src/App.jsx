// import React from 'react';

// export default function AIIMSSchoolPortalPreview() {
//   const SCHOOL_NAME = 'AIIMS School Portal';
//   const SCHOOL_TAGLINE = 'Smart Student Management System';
//   const SCHOOL_LOGO = 'https://scontent.fblr21-2.fna.fbcdn.net/v/t39.30808-6/481794218_1170107788457435_8543515203972674516_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=jBZWdszteWEQ7kNvwFcGSMI&_nc_oc=AdrmLTYyk1XS-tVGXWWqLxlDAQpmHTFtIWXzLiioeNaU-JmNJADCQ7TqeFbsCyxsLBo&_nc_zt=23&_nc_ht=scontent.fblr21-2.fna&_nc_gid=zxsPltKDiwMUtS1OZQD0BQ&_nc_ss=7b289&oh=00_Af4dzYoey9iNJQ_1gD0BKkrBRcQVwA9guqhF8A5fwvdx4Q&oe=6A12B2C5';
//   const ADMIN_EMAIL = 'admin@aiims.edu';
//   const ADMIN_PASSWORD = 'admin@123';
//   const PASS_MARK = 35;
//   const SUBJECTS = ['Maths', 'Science', 'English', 'Computer'];
//   const emptyStudent = { roll: '', name: '', className: '', section: '', fatherName: '', phone: '' };
//   const emptyResult = { roll: '', exam: '', maths: '', science: '', english: '', computer: '' };

//   const load = (key, fallback) => {
//     try {
//       const saved = localStorage.getItem(key);
//       return saved ? JSON.parse(saved) : fallback;
//     } catch {
//       return fallback;
//     }
//   };

//   const [page, setPage] = React.useState('home');
//   const [adminTab, setAdminTab] = React.useState('dashboard');
//   const [students, setStudents] = React.useState(() => load('aiims_students', []));
//   const [results, setResults] = React.useState(() => load('aiims_results', []));
//   const [notices, setNotices] = React.useState(() => load('aiims_notices', ['Mid-Term Exams begin from 15 June 2026', 'Science Exhibition registrations are now open', 'Parent-Teacher meeting on 22 June 2026']));
//   const [studentRoll, setStudentRoll] = React.useState('');
//   const [studentError, setStudentError] = React.useState('');
//   const [loggedStudent, setLoggedStudent] = React.useState(null);
//   const [adminEmail, setAdminEmail] = React.useState('');
//   const [adminPassword, setAdminPassword] = React.useState('');
//   const [studentData, setStudentData] = React.useState(emptyStudent);
//   const [resultData, setResultData] = React.useState(emptyResult);
//   const [bulkStudents, setBulkStudents] = React.useState('');
//   const [bulkResults, setBulkResults] = React.useState('');
//   const [noticeText, setNoticeText] = React.useState('');
//   const [studentSearch, setStudentSearch] = React.useState('');
//   const [resultSearch, setResultSearch] = React.useState('');
//   const [studentClassFilter, setStudentClassFilter] = React.useState('all');
//   const [studentSectionFilter, setStudentSectionFilter] = React.useState('all');
//   const [resultClassFilter, setResultClassFilter] = React.useState('all');
//   const [resultSectionFilter, setResultSectionFilter] = React.useState('all');
//   const [editingStudentRoll, setEditingStudentRoll] = React.useState(null);
//   const [editingResultRoll, setEditingResultRoll] = React.useState(null);
//   const [message, setMessage] = React.useState('');

//   React.useEffect(() => localStorage.setItem('aiims_students', JSON.stringify(students)), [students]);
//   React.useEffect(() => localStorage.setItem('aiims_results', JSON.stringify(results)), [results]);
//   React.useEffect(() => localStorage.setItem('aiims_notices', JSON.stringify(notices)), [notices]);

//   const cleanRoll = (v) => String(v || '').replace(/[^0-9]/g, '').slice(0, 5);
//   const cleanPhone = (v) => String(v || '').replace(/[^0-9]/g, '').slice(0, 10);
//   const validRoll = (v) => /^[0-9]{5}$/.test(String(v));
//   const validMark = (v) => v !== '' && !Number.isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 100;
//   const csvLine = (line) => line.split(',').map((x) => x.trim());
//   const show = (text) => { setMessage(text); setTimeout(() => setMessage(''), 3000); };

//   const stats = (r) => {
//     if (!r) return { total: 0, percent: '0.00', pass: false };
//     const marks = [Number(r.maths), Number(r.science), Number(r.english), Number(r.computer)];
//     const total = marks.reduce((a, b) => a + b, 0);
//     return { total, percent: ((total / 400) * 100).toFixed(2), pass: marks.every((m) => m >= PASS_MARK) };
//   };

//   const classOptions = React.useMemo(() => [...new Set(students.map((s) => s.className).filter(Boolean))].sort(), [students]);
//   const sectionOptions = React.useMemo(() => [...new Set(students.map((s) => s.section).filter(Boolean))].sort(), [students]);

//   const classPerformanceSummary = React.useMemo(() => {
//     const groups = {};
//     results.forEach((r) => {
//       const student = students.find((s) => s.roll === r.roll);
//       if (!student?.className) return;
//       if (!groups[student.className]) groups[student.className] = [];
//       groups[student.className].push(Number(stats(r).percent));
//     });
//     return Object.entries(groups).map(([className, percentages]) => ({
//       className,
//       students: percentages.length,
//       average: (percentages.reduce((sum, value) => sum + value, 0) / percentages.length).toFixed(2),
//     })).sort((a, b) => String(a.className).localeCompare(String(b.className), undefined, { numeric: true }));
//   }, [results, students]);

//   const getRankDetails = (roll) => {
//     const ranked = results.map((r) => {
//       const student = students.find((s) => s.roll === r.roll);
//       return { ...r, student, percentNumber: Number(stats(r).percent) };
//     }).filter((item) => item.student).sort((a, b) => b.percentNumber - a.percentNumber);
//     const current = ranked.find((item) => item.roll === roll);
//     if (!current) return { schoolRank: '-', classRank: '-', sectionRank: '-' };
//     const classList = ranked.filter((item) => item.student?.className === current.student?.className);
//     const sectionList = ranked.filter((item) => item.student?.className === current.student?.className && item.student?.section === current.student?.section);
//     return {
//       schoolRank: ranked.findIndex((item) => item.roll === roll) + 1,
//       classRank: classList.findIndex((item) => item.roll === roll) + 1,
//       sectionRank: sectionList.findIndex((item) => item.roll === roll) + 1,
//     };
//   };

//   const filteredStudents = students.filter((s) => {
//     const q = studentSearch.toLowerCase();
//     return (s.roll.includes(studentSearch) || s.name.toLowerCase().includes(q) || s.className.toLowerCase().includes(q) || s.section.toLowerCase().includes(q) || (s.fatherName || '').toLowerCase().includes(q) || (s.phone || '').includes(studentSearch)) && (studentClassFilter === 'all' || s.className === studentClassFilter) && (studentSectionFilter === 'all' || s.section === studentSectionFilter);
//   });

//   const filteredResults = results.filter((r) => {
//     const q = resultSearch.toLowerCase();
//     const s = students.find((x) => x.roll === r.roll);
//     return (r.roll.includes(resultSearch) || r.exam.toLowerCase().includes(q) || (s?.name || '').toLowerCase().includes(q)) && (resultClassFilter === 'all' || s?.className === resultClassFilter) && (resultSectionFilter === 'all' || s?.section === resultSectionFilter);
//   });

//   const Input = React.useMemo(() => function InputField({ value, onChange, placeholder, type = 'text' }) {
//     return <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="w-full border p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" />;
//   }, []);

//   const Select = React.useMemo(() => function SelectField({ value, onChange, label, options }) {
//     return <select value={value} onChange={onChange} className="w-full border p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"><option value="all">All {label}</option>{options.map((o) => <option key={o} value={o}>{o}</option>)}</select>;
//   }, []);

//   const addStudent = () => {
//     if (!studentData.name || !studentData.roll || !studentData.className || !studentData.section) return alert('Please fill name, roll, class and section.');
//     if (!validRoll(studentData.roll)) return alert('Roll number must be exactly 5 digits.');
//     if (students.some((s) => s.roll === studentData.roll && s.roll !== editingStudentRoll)) return alert('This roll number already exists.');
//     if (editingStudentRoll) {
//       setStudents(students.map((s) => s.roll === editingStudentRoll ? studentData : s));
//       setResults(results.map((r) => r.roll === editingStudentRoll ? { ...r, roll: studentData.roll } : r));
//       show('Student updated successfully.');
//     } else {
//       setStudents([...students, studentData]);
//       show('Student added successfully.');
//     }
//     setStudentData(emptyStudent);
//     setEditingStudentRoll(null);
//   };

//   const importStudents = (text) => {
//     const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
//     const oldRolls = new Set(students.map((s) => s.roll));
//     const added = [];
//     let skipped = 0;
//     lines.forEach((line, i) => {
//       const p = csvLine(line);
//       if (i === 0 && p[0]?.toLowerCase().includes('roll')) return;
//       const s = { roll: cleanRoll(p[0]), name: p[1] || '', className: p[2] || '', section: p[3] || '', fatherName: p[4] || '', phone: cleanPhone(p[5]) };
//       if (!validRoll(s.roll) || !s.name || !s.className || !s.section || oldRolls.has(s.roll) || added.some((x) => x.roll === s.roll)) skipped += 1;
//       else added.push(s);
//     });
//     if (added.length) setStudents((prev) => [...prev, ...added]);
//     return { added: added.length, skipped };
//   };

//   const importResults = (text) => {
//     const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
//     const added = [];
//     let skipped = 0;
//     lines.forEach((line, i) => {
//       const [rollRaw, exam, maths, science, english, computer] = csvLine(line);
//       if (i === 0 && rollRaw?.toLowerCase().includes('roll')) return;
//       const roll = cleanRoll(rollRaw);
//       const marks = [maths, science, english, computer];
//       if (!validRoll(roll) || !exam || marks.some((m) => !validMark(m))) skipped += 1;
//       else added.push({ roll, exam, maths, science, english, computer });
//     });
//     if (added.length) {
//       const rolls = new Set(added.map((r) => r.roll));
//       setResults((prev) => [...prev.filter((r) => !rolls.has(r.roll)), ...added]);
//     }
//     return { added: added.length, skipped };
//   };

//   const uploadFile = (event, importer, label) => {
//     const file = event.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => {
//       const report = importer(String(reader.result || ''));
//       if (!report.added) alert(`No valid ${label} found in CSV.`);
//       else show(`${report.added} ${label} imported. ${report.skipped ? `${report.skipped} rows skipped.` : ''}`);
//       event.target.value = '';
//     };
//     reader.readAsText(file);
//   };

//   const addResult = () => {
//     const marks = [resultData.maths, resultData.science, resultData.english, resultData.computer];
//     if (!validRoll(resultData.roll) || !resultData.exam || marks.some((m) => !validMark(m))) return alert('Please enter valid roll, exam and marks 0-100.');
//     setResults([...results.filter((r) => r.roll !== (editingResultRoll || resultData.roll)), resultData]);
//     show(editingResultRoll ? 'Result updated successfully.' : 'Result uploaded successfully.');
//     setResultData(emptyResult);
//     setEditingResultRoll(null);
//   };

//   const downloadCSV = (filename, rows) => {
//     const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = filename;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const loginStudent = () => {
//     const roll = cleanRoll(studentRoll);
//     const student = students.find((s) => s.roll === roll);
//     if (!student) {
//       setStudentError('Student not found. Please check your roll number.');
//       return;
//     }
//     setLoggedStudent(student);
//     setStudentRoll(roll);
//     setStudentError('');
//     setPage('studentDashboard');
//   };

//   const loginAdmin = () => {
//     if (adminEmail === ADMIN_EMAIL && adminPassword === ADMIN_PASSWORD) {
//       setPage('adminDashboard');
//       setAdminTab('dashboard');
//       setAdminEmail('');
//       setAdminPassword('');
//     } else {
//       alert('Invalid admin login details.');
//     }
//   };

//   const Home = () => {
//     const topResults = results.map((r) => {
//       const student = students.find((s) => s.roll === r.roll);
//       return { ...r, studentName: student?.name || 'Student', className: student?.className || '-', section: student?.section || '-', ...stats(r) };
//     }).sort((a, b) => Number(b.percent) - Number(a.percent)).slice(0, 3);
//     const events = [
//       { title: 'Annual Day', date: 'Coming Soon', detail: 'Cultural programs, awards and student performances.' },
//       { title: 'Sports Day', date: 'Coming Soon', detail: 'Track events, team games and house competitions.' },
//       { title: 'Parent-Teacher Meeting', date: 'Coming Soon', detail: 'Parents can meet teachers and discuss student progress.' },
//     ];
//     const parentInfo = [
//       { title: 'Office Timing', value: '9:00 AM - 3:00 PM' },
//       { title: 'Fee Counter', value: '10:00 AM - 2:00 PM' },
//       { title: 'Required Documents', value: 'Birth Certificate, Aadhaar, Photos, Previous Report Card' },
//       { title: 'Contact Number', value: '+91 98765 43210' },
//     ];
//     const faqs = [
//       { question: 'How can students check their result?', answer: 'Students can click Student Login and enter their 5 digit roll number to view their result.' },
//       { question: 'What should parents do for admission enquiry?', answer: 'Parents can contact the school office during office timing for admission details and required documents.' },
//       { question: 'Where are school notices shown?', answer: 'Latest announcements are shown on the home page and can be updated from the admin dashboard.' },
//       { question: 'What documents are required for admission?', answer: 'Birth certificate, Aadhaar card, passport size photos and previous report card are commonly required.' },
//     ];
//     return <main>
//       <section className="px-8 py-20 text-center"><img src={SCHOOL_LOGO} alt="School Logo" className="w-36 h-36 mx-auto mb-8 rounded-full object-cover shadow-xl border-4 border-white" /><h2 className="text-6xl font-extrabold mb-6">Welcome to <span className="text-blue-700">AIIMS</span></h2><p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">A modern school management and result portal where students can securely check results, notices, attendance, and more.</p><button onClick={() => setPage('student')} className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg shadow-lg">Explore Dashboard</button></section>
//       <section className="px-8 pb-20"><div className={results.length ? 'max-w-7xl mx-auto bg-green-50 border border-green-200 rounded-3xl p-8 shadow-xl text-center' : 'max-w-7xl mx-auto bg-yellow-50 border border-yellow-200 rounded-3xl p-8 shadow-xl text-center'}><h3 className={results.length ? 'text-3xl font-bold text-green-700 mb-3' : 'text-3xl font-bold text-yellow-700 mb-3'}>{results.length ? '🎉 Congratulations! Latest results are now available.' : '📌 Results will be available soon.'}</h3><p className="text-gray-700 text-lg">{results.length ? 'Students can login using their roll number to check percentage, pass/fail status and rank.' : 'Please keep checking latest announcements for result updates.'}</p><button onClick={() => setPage('student')} className={results.length ? 'mt-6 bg-green-600 text-white px-8 py-4 rounded-2xl font-bold' : 'mt-6 bg-yellow-600 text-white px-8 py-4 rounded-2xl font-bold'}>{results.length ? 'Check Result Now' : 'Go to Student Login'}</button></div></section>
//       <section className="px-8 pb-20"><h3 className="text-4xl font-bold text-center mb-12">Portal Features</h3><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">{['Secure Student Login', 'Online Result System', 'Bulk Upload', 'Admin Dashboard'].map((f) => <div key={f} className="bg-white p-8 rounded-3xl shadow-lg"><div className="text-5xl mb-4">📘</div><h4 className="text-xl font-bold mb-3">{f}</h4><p className="text-gray-600">Responsive system designed for students and school administration.</p></div>)}</div></section>
//       <section className="px-8 pb-20"><div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"><div className="bg-white rounded-3xl shadow-xl p-10"><p className="text-blue-700 font-bold mb-3">About Our School</p><h3 className="text-4xl font-bold mb-6">Building Bright Futures With Smart Learning</h3><p className="text-gray-600 text-lg leading-relaxed mb-6">AIIMS School focuses on discipline, quality education, digital learning, and student growth.</p><div className="grid grid-cols-1 sm:grid-cols-3 gap-4"><div className="bg-blue-50 p-5 rounded-2xl text-center"><h4 className="text-3xl font-bold text-blue-700">{students.length || '3000+'}</h4><p className="text-gray-600 text-sm mt-1">Students</p></div><div className="bg-green-50 p-5 rounded-2xl text-center"><h4 className="text-3xl font-bold text-green-700">12+</h4><p className="text-gray-600 text-sm mt-1">Classes</p></div><div className="bg-purple-50 p-5 rounded-2xl text-center"><h4 className="text-3xl font-bold text-purple-700">{results.length}</h4><p className="text-gray-600 text-sm mt-1">Results</p></div></div></div><div className="bg-blue-700 text-white rounded-3xl shadow-xl p-10"><p className="font-bold opacity-90 mb-3">Admissions Open</p><h3 className="text-4xl font-bold mb-5">Admissions Open for 2026-27</h3><p className="text-blue-100 text-lg leading-relaxed mb-8">Contact the school office for admission details, fee structure, documents required, and class availability.</p><button onClick={() => setPage('student')} className="bg-white text-blue-700 px-6 py-3 rounded-2xl font-bold">Student Portal</button></div></div></section>
//       <section className="px-8 pb-20"><div className="max-w-7xl mx-auto"><h3 className="text-4xl font-bold text-center mb-3 text-blue-700">Top 3 Performers</h3><p className="text-center text-gray-500 mb-12">Only the best 3 students are shown here based on uploaded results.</p><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{topResults.length ? topResults.map((r, index) => <div key={r.roll} className="bg-white rounded-3xl shadow-xl p-8 text-center"><div className="text-5xl mb-4">🏆</div><p className="text-gray-500 font-bold">Rank {index + 1}</p><h4 className="text-2xl font-bold mt-2">{r.studentName}</h4><p className="text-gray-500">Class {r.className} - Section {r.section}</p><div className="mt-5 bg-green-50 text-green-700 rounded-2xl p-4"><p className="text-sm font-semibold">Percentage</p><h5 className="text-3xl font-bold">{r.percent}%</h5></div></div>) : [1, 2, 3].map((x) => <div key={x} className="bg-white rounded-3xl shadow-xl p-8 text-center"><div className="text-5xl mb-4">🏆</div><h4 className="text-2xl font-bold">Topper Name</h4><p className="text-gray-500">Will appear after results are uploaded</p><div className="mt-5 bg-blue-50 text-blue-700 rounded-2xl p-4"><p className="font-semibold">Result Pending</p></div></div>)}</div></div></section>
//       <section className="px-8 pb-20"><div className="max-w-7xl mx-auto"><h3 className="text-4xl font-bold text-center mb-12">Upcoming Events</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{events.map((event) => <div key={event.title} className="bg-white rounded-3xl shadow-xl p-8"><div className="text-5xl mb-4">📅</div><h4 className="text-2xl font-bold text-blue-700 mb-2">{event.title}</h4><p className="font-semibold text-gray-500 mb-4">{event.date}</p><p className="text-gray-600 leading-relaxed">{event.detail}</p></div>)}</div></div></section>
//       <section className="px-8 pb-20"><div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-10"><h3 className="text-4xl font-bold text-center mb-10 text-blue-700">Parent Information</h3><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{parentInfo.map((info) => <div key={info.title} className="bg-blue-50 p-6 rounded-2xl"><h4 className="text-lg font-bold text-blue-700 mb-2">{info.title}</h4><p className="text-gray-700">{info.value}</p></div>)}</div></div></section>
//       <section className="px-8 pb-20"><div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-10"><h3 className="text-4xl font-bold text-center mb-10 text-blue-700">Frequently Asked Questions</h3><div className="space-y-4">{faqs.map((faq) => <div key={faq.question} className="bg-gray-50 p-6 rounded-2xl"><h4 className="text-lg font-bold text-gray-800 mb-2">{faq.question}</h4><p className="text-gray-600">{faq.answer}</p></div>)}</div></div></section>
//       <section className="px-8 pb-20"><div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-10"><h3 className="text-4xl font-bold mb-8 text-center text-blue-700">Latest Announcements</h3><div className="space-y-4">{notices.map((n, i) => <div key={i} className="bg-blue-50 border-l-4 border-blue-700 p-5 rounded-2xl"><p className="font-medium text-lg">📢 {n}</p></div>)}</div></div></section>
//       <footer className="bg-blue-700 text-white py-10 text-center"><img src={SCHOOL_LOGO} alt="School Logo" className="w-20 h-20 mx-auto mb-4 rounded-full object-cover border-2 border-white" /><h4 className="text-2xl font-bold mb-3">{SCHOOL_NAME}</h4><p className="opacity-90">Built with love! Copyright @2026 Developed by Daris Nisar</p></footer>
//     </main>;
//   };

//   const StudentLogin = () => <main className="min-h-screen flex items-center justify-center p-6"><div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"><h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Student Login</h2><Input value={studentRoll} onChange={(e) => setStudentRoll(cleanRoll(e.target.value))} placeholder="Enter 5 Digit Roll Number" /><button onClick={loginStudent} className="w-full bg-blue-600 text-white p-4 rounded-2xl mt-4 font-bold">Login</button>{studentError && <p className="text-red-600 mt-4 text-center">{studentError}</p>}</div></main>;

//   const AdminLogin = () => <main className="min-h-screen flex items-center justify-center p-6"><div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"><h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Admin Login</h2><div className="space-y-4"><Input value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} placeholder="Admin Email" /><Input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="Admin Password" /></div><button onClick={loginAdmin} className="w-full bg-blue-600 text-white p-4 rounded-2xl mt-4 font-bold">Login</button><p className="text-xs text-gray-400 mt-4 text-center">Admin details are hidden for security.</p></div></main>;

//   const StudentDashboard = () => {
//     const r = results.find((x) => x.roll === studentRoll);
//     const st = stats(r);
//     const rank = getRankDetails(studentRoll);
//     return <main className="p-8 max-w-5xl mx-auto"><div className="bg-white rounded-3xl shadow-xl p-8"><h2 className="text-3xl font-bold text-blue-700 mb-2">Welcome, {loggedStudent?.name}</h2><p className="text-gray-500 mb-6">Roll: {loggedStudent?.roll} | Class {loggedStudent?.className} - Section {loggedStudent?.section}</p><div className="bg-blue-50 rounded-3xl p-6 mb-8"><h3 className="text-2xl font-bold text-blue-700 mb-5">Student Details</h3><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><div className="bg-white p-4 rounded-2xl"><p className="text-sm font-bold text-gray-500">Student Name</p><p className="text-lg font-bold">{loggedStudent?.name || '-'}</p></div><div className="bg-white p-4 rounded-2xl"><p className="text-sm font-bold text-gray-500">Roll Number</p><p className="text-lg font-bold">{loggedStudent?.roll || '-'}</p></div><div className="bg-white p-4 rounded-2xl"><p className="text-sm font-bold text-gray-500">Class</p><p className="text-lg font-bold">{loggedStudent?.className || '-'}</p></div><div className="bg-white p-4 rounded-2xl"><p className="text-sm font-bold text-gray-500">Section</p><p className="text-lg font-bold">{loggedStudent?.section || '-'}</p></div><div className="bg-white p-4 rounded-2xl"><p className="text-sm font-bold text-gray-500">Father Name</p><p className="text-lg font-bold">{loggedStudent?.fatherName || '-'}</p></div><div className="bg-white p-4 rounded-2xl"><p className="text-sm font-bold text-gray-500">Phone Number</p><p className="text-lg font-bold">{loggedStudent?.phone || '-'}</p></div></div></div>{r ? <><h3 className="text-2xl font-bold mb-4">{r.exam} Result</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"><div className="bg-blue-50 p-5 rounded-2xl"><p>Total Marks</p><h3 className="text-2xl font-bold text-blue-700">{st.total} / 400</h3></div><div className="bg-green-50 p-5 rounded-2xl"><p>Percentage</p><h3 className="text-2xl font-bold text-green-700">{st.percent}%</h3></div><div className={st.pass ? 'bg-green-100 p-5 rounded-2xl' : 'bg-red-100 p-5 rounded-2xl'}><p>Status</p><h3 className={st.pass ? 'text-2xl font-bold text-green-700' : 'text-2xl font-bold text-red-700'}>{st.pass ? 'PASS' : 'FAIL'}</h3></div></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"><div className="bg-purple-50 p-5 rounded-2xl"><p>School Rank</p><h3 className="text-2xl font-bold text-purple-700">#{rank.schoolRank}</h3></div><div className="bg-orange-50 p-5 rounded-2xl"><p>Class Rank</p><h3 className="text-2xl font-bold text-orange-700">#{rank.classRank}</h3></div><div className="bg-indigo-50 p-5 rounded-2xl"><p>Section Rank</p><h3 className="text-2xl font-bold text-indigo-700">#{rank.sectionRank}</h3></div></div><div className="mt-8"><h3 className="text-2xl font-bold text-blue-700 mb-5">Subject Wise Marks</h3><div className="space-y-4">{SUBJECTS.map((sub) => { const mark = Number(r[sub.toLowerCase()]); const isPass = mark >= PASS_MARK; return <div key={sub} className={isPass ? 'rounded-3xl p-5 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-100 shadow-lg' : 'rounded-3xl p-5 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-100 shadow-lg'}><div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"><div className="md:col-span-3"><p className="text-sm font-bold text-gray-500">Subject</p><h4 className="text-2xl font-extrabold text-gray-800">{sub}</h4></div><div className="md:col-span-2"><p className="text-sm font-bold text-gray-500">Marks</p><h4 className={isPass ? 'text-4xl font-extrabold text-blue-700' : 'text-4xl font-extrabold text-red-700'}>{mark}/100</h4></div><div className="md:col-span-5"><p className="text-sm font-bold text-gray-500 mb-2">Performance</p><div className="w-full bg-white rounded-full h-4 overflow-hidden"><div className={isPass ? 'bg-blue-600 h-4 rounded-full' : 'bg-red-600 h-4 rounded-full'} style={{ width: `${Math.min(mark, 100)}%` }}></div></div></div><div className="md:col-span-2 md:text-right"><span className={isPass ? 'inline-block text-sm font-bold bg-green-600 text-white px-4 py-2 rounded-full' : 'inline-block text-sm font-bold bg-red-600 text-white px-4 py-2 rounded-full'}>{isPass ? 'PASS' : 'FAIL'}</span></div></div></div>; })}</div></div></> : <div className="bg-yellow-50 p-6 rounded-2xl text-yellow-700 font-semibold">Result not uploaded yet.</div>}</div></main>;
//   };

//   const StudentForm = () => <div className="bg-blue-50 rounded-3xl p-5 mb-6"><h3 className="font-bold text-blue-700 mb-4">Add / Edit Student Details</h3><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><label><span className="text-sm font-bold text-gray-600 mb-2 block">Student Name</span><Input value={studentData.name} onChange={(e) => setStudentData({ ...studentData, name: e.target.value })} placeholder="Enter student name" /></label><label><span className="text-sm font-bold text-gray-600 mb-2 block">Roll Number</span><Input value={studentData.roll} onChange={(e) => setStudentData({ ...studentData, roll: cleanRoll(e.target.value) })} placeholder="Enter 5 digit roll number" /></label><label><span className="text-sm font-bold text-gray-600 mb-2 block">Class</span><Input value={studentData.className} onChange={(e) => setStudentData({ ...studentData, className: e.target.value })} placeholder="Enter class" /></label><label><span className="text-sm font-bold text-gray-600 mb-2 block">Section</span><Input value={studentData.section} onChange={(e) => setStudentData({ ...studentData, section: e.target.value })} placeholder="Enter section" /></label><label><span className="text-sm font-bold text-gray-600 mb-2 block">Father Name</span><Input value={studentData.fatherName} onChange={(e) => setStudentData({ ...studentData, fatherName: e.target.value })} placeholder="Enter father name" /></label><label><span className="text-sm font-bold text-gray-600 mb-2 block">Phone Number</span><Input value={studentData.phone} onChange={(e) => setStudentData({ ...studentData, phone: cleanPhone(e.target.value) })} placeholder="Enter phone number" /></label></div></div>;

//   const AdminDashboard = () => <main className="p-6 max-w-7xl mx-auto"><div className="bg-white rounded-3xl shadow-xl p-6"><div className="flex flex-wrap gap-3 mb-6">{['dashboard', 'students', 'results', 'notices'].map((tab) => <button key={tab} onClick={() => setAdminTab(tab)} className={adminTab === tab ? 'bg-blue-600 text-white px-5 py-3 rounded-2xl font-bold capitalize' : 'bg-gray-100 px-5 py-3 rounded-2xl font-bold capitalize'}>{tab}</button>)}</div>{message && <div className="bg-green-50 text-green-700 p-4 rounded-2xl mb-6 font-semibold">{message}</div>}
//     {adminTab === 'dashboard' && <div><h2 className="text-2xl font-bold mb-4">Welcome Admin 👋</h2><p className="text-gray-600 mb-8">Select an action above to manage the school portal.</p><div className="bg-blue-50 rounded-3xl p-6"><h3 className="text-2xl font-bold text-blue-700 mb-5">Class Performance Summary</h3>{classPerformanceSummary.length ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{classPerformanceSummary.map((item) => <div key={item.className} className="bg-white rounded-2xl p-5 shadow"><p className="text-gray-500 font-semibold">Class {item.className}</p><h4 className="text-3xl font-bold text-blue-700 mt-2">{item.average}%</h4><p className="text-sm text-gray-500 mt-2">Average from {item.students} result{item.students > 1 ? 's' : ''}</p></div>)}</div> : <div className="bg-white p-5 rounded-2xl text-gray-500">No class performance data yet. Upload results to see class averages.</div>}</div></div>}
//     {adminTab === 'students' && <div><h2 className="text-2xl font-bold mb-4">Manage Students</h2>{StudentForm()}<button onClick={addStudent} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold mb-8">{editingStudentRoll ? 'Update Student' : 'Add Student'}</button><div className="bg-gray-50 p-5 rounded-2xl mb-6"><h3 className="font-bold mb-3">Bulk Add Students</h3><p className="text-sm text-gray-500 mb-3">Format: roll,name,class,section,father,phone</p><textarea value={bulkStudents} onChange={(e) => setBulkStudents(e.target.value)} className="w-full border p-4 rounded-2xl h-28" placeholder="10001,Ali,10,A,Mr Khan,9876543210" /><div className="flex flex-wrap gap-3 mt-3"><button onClick={() => { const report = importStudents(bulkStudents); show(`${report.added} students added. ${report.skipped} skipped.`); setBulkStudents(''); }} className="bg-green-600 text-white px-5 py-3 rounded-2xl font-bold">Import Pasted Students</button><input type="file" accept=".csv,.txt" onChange={(e) => uploadFile(e, importStudents, 'students')} /></div></div><div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4"><Input value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} placeholder="Search students" /><Select value={studentClassFilter} onChange={(e) => setStudentClassFilter(e.target.value)} label="Classes" options={classOptions} /><Select value={studentSectionFilter} onChange={(e) => setStudentSectionFilter(e.target.value)} label="Sections" options={sectionOptions} /></div><button onClick={() => downloadCSV('students.csv', [['Roll','Name','Class','Section','Father','Phone'], ...students.map((s) => [s.roll, s.name, s.className, s.section, s.fatherName, s.phone])])} className="bg-gray-800 text-white px-5 py-3 rounded-2xl mb-4">Export Students CSV</button><div className="space-y-3"><div className="hidden lg:grid grid-cols-7 gap-3 bg-blue-600 text-white font-bold p-4 rounded-2xl"><p>Name</p><p>Roll</p><p>Class</p><p>Section</p><p>Father Name</p><p>Phone Number</p><p>Action</p></div>{filteredStudents.map((s) => <div key={s.roll} className="border p-5 rounded-2xl bg-white"><div className="grid grid-cols-1 lg:grid-cols-7 gap-3 items-center"><p><span className="lg:hidden font-bold text-gray-600">Name: </span>{s.name}</p><p><span className="lg:hidden font-bold text-gray-600">Roll: </span>{s.roll}</p><p><span className="lg:hidden font-bold text-gray-600">Class: </span>{s.className}</p><p><span className="lg:hidden font-bold text-gray-600">Section: </span>{s.section}</p><p><span className="lg:hidden font-bold text-gray-600">Father Name: </span>{s.fatherName || '-'}</p><p><span className="lg:hidden font-bold text-gray-600">Phone Number: </span>{s.phone || '-'}</p><div className="flex gap-2"><button onClick={() => { setStudentData(s); setEditingStudentRoll(s.roll); }} className="bg-yellow-500 text-white px-4 py-2 rounded-xl">Edit</button><button onClick={() => setStudents(students.filter((x) => x.roll !== s.roll))} className="bg-red-600 text-white px-4 py-2 rounded-xl">Delete</button></div></div></div>)}</div></div>}
//     {adminTab === 'results' && <div><h2 className="text-2xl font-bold mb-4">Manage Results</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"><Input value={resultData.roll} onChange={(e) => setResultData({ ...resultData, roll: cleanRoll(e.target.value) })} placeholder="Roll Number" /><Input value={resultData.exam} onChange={(e) => setResultData({ ...resultData, exam: e.target.value })} placeholder="Exam Name" /><Input value={resultData.maths} onChange={(e) => setResultData({ ...resultData, maths: e.target.value })} placeholder="Maths" /><Input value={resultData.science} onChange={(e) => setResultData({ ...resultData, science: e.target.value })} placeholder="Science" /><Input value={resultData.english} onChange={(e) => setResultData({ ...resultData, english: e.target.value })} placeholder="English" /><Input value={resultData.computer} onChange={(e) => setResultData({ ...resultData, computer: e.target.value })} placeholder="Computer" /></div><button onClick={addResult} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold mb-8">{editingResultRoll ? 'Update Result' : 'Upload Result'}</button><div className="bg-gray-50 p-5 rounded-2xl mb-6"><h3 className="font-bold mb-3">Bulk Add Results</h3><p className="text-sm text-gray-500 mb-3">Format: roll,exam,maths,science,english,computer</p><textarea value={bulkResults} onChange={(e) => setBulkResults(e.target.value)} className="w-full border p-4 rounded-2xl h-28" placeholder="10001,Mid Term,80,75,90,88" /><div className="flex flex-wrap gap-3 mt-3"><button onClick={() => { const report = importResults(bulkResults); show(`${report.added} results imported. ${report.skipped} skipped.`); setBulkResults(''); }} className="bg-green-600 text-white px-5 py-3 rounded-2xl font-bold">Import Pasted Results</button><input type="file" accept=".csv,.txt" onChange={(e) => uploadFile(e, importResults, 'results')} /></div></div><div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4"><Input value={resultSearch} onChange={(e) => setResultSearch(e.target.value)} placeholder="Search results" /><Select value={resultClassFilter} onChange={(e) => setResultClassFilter(e.target.value)} label="Classes" options={classOptions} /><Select value={resultSectionFilter} onChange={(e) => setResultSectionFilter(e.target.value)} label="Sections" options={sectionOptions} /></div><button onClick={() => downloadCSV('results.csv', [['Roll','Exam','Maths','Science','English','Computer','Percentage','Status'], ...results.map((r) => [r.roll, r.exam, r.maths, r.science, r.english, r.computer, stats(r).percent, stats(r).pass ? 'PASS' : 'FAIL'])])} className="bg-gray-800 text-white px-5 py-3 rounded-2xl mb-4">Export Results CSV</button><div className="space-y-3">{filteredResults.map((r) => { const s = students.find((x) => x.roll === r.roll); const st = stats(r); return <div key={r.roll} className="border p-4 rounded-2xl flex justify-between gap-4 flex-wrap"><div><b>{s?.name || 'Unknown Student'}</b><p className="text-gray-500">Roll {r.roll} | {r.exam} | {st.percent}% | {st.pass ? 'PASS' : 'FAIL'}</p></div><div className="flex gap-2"><button onClick={() => { setResultData(r); setEditingResultRoll(r.roll); }} className="bg-yellow-500 text-white px-4 py-2 rounded-xl">Edit</button><button onClick={() => setResults(results.filter((x) => x.roll !== r.roll))} className="bg-red-600 text-white px-4 py-2 rounded-xl">Delete</button></div></div>; })}</div></div>}
//     {adminTab === 'notices' && <div><h2 className="text-2xl font-bold mb-4">Manage Notices</h2><div className="flex gap-3 mb-6"><input value={noticeText} onChange={(e) => setNoticeText(e.target.value)} placeholder="Write notice" className="flex-1 border p-4 rounded-2xl" /><button onClick={() => { if (noticeText.trim()) { setNotices([noticeText.trim(), ...notices]); setNoticeText(''); show('Notice added.'); } }} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold">Add</button></div><div className="space-y-3">{notices.map((n, i) => <div key={i} className="border p-4 rounded-2xl flex justify-between gap-4"><p>{n}</p><button onClick={() => setNotices(notices.filter((_, index) => index !== i))} className="bg-red-600 text-white px-4 py-2 rounded-xl">Delete</button></div>)}</div></div>}
//   </div></main>;

//   return <div className="min-h-screen bg-gray-100 text-gray-900"><header className="bg-white shadow sticky top-0 z-50"><div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center gap-4"><div className="flex items-center gap-3"><img src={SCHOOL_LOGO} alt="School Logo" className="w-12 h-12 rounded-full object-cover" /><div><h1 className="text-xl font-bold text-blue-700">{SCHOOL_NAME}</h1><p className="text-xs text-gray-500">{SCHOOL_TAGLINE}</p></div></div><nav className="flex gap-2 flex-wrap justify-end bg-blue-50/70 p-2 rounded-2xl border border-blue-100 shadow-inner"><button onClick={() => setPage('home')} className={page === 'home' ? 'relative px-5 py-2 rounded-xl bg-blue-600 text-white font-bold shadow-lg scale-105 transition-all duration-300' : 'relative px-5 py-2 rounded-xl font-bold text-gray-700 hover:text-blue-700 hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300'}>Home</button><button onClick={() => setPage('student')} className={page === 'student' || page === 'studentDashboard' ? 'relative px-5 py-2 rounded-xl bg-blue-600 text-white font-bold shadow-lg scale-105 transition-all duration-300' : 'relative px-5 py-2 rounded-xl font-bold text-gray-700 hover:text-blue-700 hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300'}>Student</button><button onClick={() => setPage('admin')} className={page === 'admin' || page === 'adminDashboard' ? 'relative px-5 py-2 rounded-xl bg-blue-600 text-white font-bold shadow-lg scale-105 transition-all duration-300' : 'relative px-5 py-2 rounded-xl font-bold text-gray-700 hover:text-blue-700 hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300'}>Admin</button></nav></div></header>{page === 'home' && Home()}{page === 'student' && StudentLogin()}{page === 'admin' && AdminLogin()}{page === 'studentDashboard' && StudentDashboard()}{page === 'adminDashboard' && AdminDashboard()}</div>;
// }
import React from 'react';

export default function AIIMSSchoolPortalPreview() {
  const SCHOOL_NAME = 'AIIMS School Portal';
  const SCHOOL_TAGLINE = 'Smart Student Management System';
  const SCHOOL_LOGO = 'https://scontent.fblr21-2.fna.fbcdn.net/v/t39.30808-6/481794218_1170107788457435_8543515203972674516_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=jBZWdszteWEQ7kNvwFcGSMI&_nc_oc=AdrmLTYyk1XS-tVGXWWqLxlDAQpmHTFtIWXzLiioeNaU-JmNJADCQ7TqeFbsCyxsLBo&_nc_zt=23&_nc_ht=scontent.fblr21-2.fna&_nc_gid=zxsPltKDiwMUtS1OZQD0BQ&_nc_ss=7b289&oh=00_Af4dzYoey9iNJQ_1gD0BKkrBRcQVwA9guqhF8A5fwvdx4Q&oe=6A12B2C5';
  const ADMIN_EMAIL = 'admin@aiims.edu';
  const ADMIN_PASSWORD = 'admin@123';
  const PASS_MARK = 35;
  const SUBJECTS = ['Maths', 'Science', 'English', 'Computer'];
  const emptyStudent = { roll: '', name: '', className: '', section: '', fatherName: '', phone: '' };
  const emptyResult = { roll: '', exam: '', maths: '', science: '', english: '', computer: '' };

  const load = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [page, setPage] = React.useState('home');
  const [adminTab, setAdminTab] = React.useState('dashboard');
  const [students, setStudents] = React.useState(() => load('aiims_students', []));
  const [results, setResults] = React.useState(() => load('aiims_results', []));
  const [notices, setNotices] = React.useState(() => load('aiims_notices', ['Mid-Term Exams begin from 15 June 2026', 'Science Exhibition registrations are now open', 'Parent-Teacher meeting on 22 June 2026']));
  const [studentRoll, setStudentRoll] = React.useState('');
  const [studentError, setStudentError] = React.useState('');
  const [loggedStudent, setLoggedStudent] = React.useState(null);
  const [adminEmail, setAdminEmail] = React.useState('');
  const [adminPassword, setAdminPassword] = React.useState('');
  const [studentData, setStudentData] = React.useState(emptyStudent);
  const [resultData, setResultData] = React.useState(emptyResult);
  const [bulkStudents, setBulkStudents] = React.useState('');
  const [bulkResults, setBulkResults] = React.useState('');
  const [noticeText, setNoticeText] = React.useState('');
  const [studentSearch, setStudentSearch] = React.useState('');
  const [resultSearch, setResultSearch] = React.useState('');
  const [studentClassFilter, setStudentClassFilter] = React.useState('all');
  const [studentSectionFilter, setStudentSectionFilter] = React.useState('all');
  const [resultClassFilter, setResultClassFilter] = React.useState('all');
  const [resultSectionFilter, setResultSectionFilter] = React.useState('all');
  const [editingStudentRoll, setEditingStudentRoll] = React.useState(null);
  const [editingResultRoll, setEditingResultRoll] = React.useState(null);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => localStorage.setItem('aiims_students', JSON.stringify(students)), [students]);
  React.useEffect(() => localStorage.setItem('aiims_results', JSON.stringify(results)), [results]);
  React.useEffect(() => localStorage.setItem('aiims_notices', JSON.stringify(notices)), [notices]);

  const cleanRoll = (v) => String(v || '').replace(/[^0-9]/g, '').slice(0, 5);
  const cleanPhone = (v) => String(v || '').replace(/[^0-9]/g, '').slice(0, 10);
  const validRoll = (v) => /^[0-9]{5}$/.test(String(v));
  const validMark = (v) => v !== '' && !Number.isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 100;
  const csvLine = (line) => line.split(',').map((x) => x.trim());
  const show = (text) => { setMessage(text); setTimeout(() => setMessage(''), 3000); };

  const stats = (r) => {
    if (!r) return { total: 0, percent: '0.00', pass: false };
    const marks = [Number(r.maths), Number(r.science), Number(r.english), Number(r.computer)];
    const total = marks.reduce((a, b) => a + b, 0);
    return { total, percent: ((total / 400) * 100).toFixed(2), pass: marks.every((m) => m >= PASS_MARK) };
  };

  const classOptions = React.useMemo(() => [...new Set(students.map((s) => s.className).filter(Boolean))].sort(), [students]);
  const sectionOptions = React.useMemo(() => [...new Set(students.map((s) => s.section).filter(Boolean))].sort(), [students]);

  const classPerformanceSummary = React.useMemo(() => {
    const groups = {};
    results.forEach((r) => {
      const student = students.find((s) => s.roll === r.roll);
      if (!student?.className) return;
      if (!groups[student.className]) groups[student.className] = [];
      groups[student.className].push(Number(stats(r).percent));
    });
    return Object.entries(groups).map(([className, percentages]) => ({
      className,
      students: percentages.length,
      average: (percentages.reduce((sum, value) => sum + value, 0) / percentages.length).toFixed(2),
    })).sort((a, b) => String(a.className).localeCompare(String(b.className), undefined, { numeric: true }));
  }, [results, students]);

  const getRankDetails = (roll) => {
    const ranked = results.map((r) => {
      const student = students.find((s) => s.roll === r.roll);
      return { ...r, student, percentNumber: Number(stats(r).percent) };
    }).filter((item) => item.student).sort((a, b) => b.percentNumber - a.percentNumber);
    const current = ranked.find((item) => item.roll === roll);
    if (!current) return { schoolRank: '-', classRank: '-', sectionRank: '-' };
    const classList = ranked.filter((item) => item.student?.className === current.student?.className);
    const sectionList = ranked.filter((item) => item.student?.className === current.student?.className && item.student?.section === current.student?.section);
    return {
      schoolRank: ranked.findIndex((item) => item.roll === roll) + 1,
      classRank: classList.findIndex((item) => item.roll === roll) + 1,
      sectionRank: sectionList.findIndex((item) => item.roll === roll) + 1,
    };
  };

  const filteredStudents = students.filter((s) => {
    const q = studentSearch.toLowerCase();
    return (s.roll.includes(studentSearch) || s.name.toLowerCase().includes(q) || s.className.toLowerCase().includes(q) || s.section.toLowerCase().includes(q) || (s.fatherName || '').toLowerCase().includes(q) || (s.phone || '').includes(studentSearch)) && (studentClassFilter === 'all' || s.className === studentClassFilter) && (studentSectionFilter === 'all' || s.section === studentSectionFilter);
  });

  const filteredResults = results.filter((r) => {
    const q = resultSearch.toLowerCase();
    const s = students.find((x) => x.roll === r.roll);
    return (r.roll.includes(resultSearch) || r.exam.toLowerCase().includes(q) || (s?.name || '').toLowerCase().includes(q)) && (resultClassFilter === 'all' || s?.className === resultClassFilter) && (resultSectionFilter === 'all' || s?.section === resultSectionFilter);
  });

  const Input = React.useMemo(() => function InputField({ value, onChange, placeholder, type = 'text' }) {
    return <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="w-full border p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" />;
  }, []);

  const Select = React.useMemo(() => function SelectField({ value, onChange, label, options }) {
    return <select value={value} onChange={onChange} className="w-full border p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"><option value="all">All {label}</option>{options.map((o) => <option key={o} value={o}>{o}</option>)}</select>;
  }, []);

  const addStudent = () => {
    if (!studentData.name || !studentData.roll || !studentData.className || !studentData.section) return alert('Please fill name, roll, class and section.');
    if (!validRoll(studentData.roll)) return alert('Roll number must be exactly 5 digits.');
    if (students.some((s) => s.roll === studentData.roll && s.roll !== editingStudentRoll)) return alert('This roll number already exists.');
    if (editingStudentRoll) {
      setStudents(students.map((s) => s.roll === editingStudentRoll ? studentData : s));
      setResults(results.map((r) => r.roll === editingStudentRoll ? { ...r, roll: studentData.roll } : r));
      show('Student updated successfully.');
    } else {
      setStudents([...students, studentData]);
      show('Student added successfully.');
    }
    setStudentData(emptyStudent);
    setEditingStudentRoll(null);
  };

  const importStudents = (text) => {
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    const oldRolls = new Set(students.map((s) => s.roll));
    const added = [];
    let skipped = 0;
    lines.forEach((line, i) => {
      const p = csvLine(line);
      if (i === 0 && p[0]?.toLowerCase().includes('roll')) return;
      const s = { roll: cleanRoll(p[0]), name: p[1] || '', className: p[2] || '', section: p[3] || '', fatherName: p[4] || '', phone: cleanPhone(p[5]) };
      if (!validRoll(s.roll) || !s.name || !s.className || !s.section || oldRolls.has(s.roll) || added.some((x) => x.roll === s.roll)) skipped += 1;
      else added.push(s);
    });
    if (added.length) setStudents((prev) => [...prev, ...added]);
    return { added: added.length, skipped };
  };

  const importResults = (text) => {
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    const added = [];
    let skipped = 0;
    lines.forEach((line, i) => {
      const [rollRaw, exam, maths, science, english, computer] = csvLine(line);
      if (i === 0 && rollRaw?.toLowerCase().includes('roll')) return;
      const roll = cleanRoll(rollRaw);
      const marks = [maths, science, english, computer];
      if (!validRoll(roll) || !exam || marks.some((m) => !validMark(m))) skipped += 1;
      else added.push({ roll, exam, maths, science, english, computer });
    });
    if (added.length) {
      const rolls = new Set(added.map((r) => r.roll));
      setResults((prev) => [...prev.filter((r) => !rolls.has(r.roll)), ...added]);
    }
    return { added: added.length, skipped };
  };

  const uploadFile = (event, importer, label) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const report = importer(String(reader.result || ''));
      if (!report.added) alert(`No valid ${label} found in CSV.`);
      else show(`${report.added} ${label} imported. ${report.skipped ? `${report.skipped} rows skipped.` : ''}`);
      event.target.value = '';
    };
    reader.readAsText(file);
  };

  const addResult = () => {
    const marks = [resultData.maths, resultData.science, resultData.english, resultData.computer];
    if (!validRoll(resultData.roll) || !resultData.exam || marks.some((m) => !validMark(m))) return alert('Please enter valid roll, exam and marks 0-100.');
    setResults([...results.filter((r) => r.roll !== (editingResultRoll || resultData.roll)), resultData]);
    show(editingResultRoll ? 'Result updated successfully.' : 'Result uploaded successfully.');
    setResultData(emptyResult);
    setEditingResultRoll(null);
  };

  const downloadCSV = (filename, rows) => {
    const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loginStudent = () => {
    const roll = cleanRoll(studentRoll);
    const student = students.find((s) => s.roll === roll);
    if (!student) {
      setStudentError('Student not found. Please check your roll number.');
      return;
    }
    setLoggedStudent(student);
    setStudentRoll(roll);
    setStudentError('');
    setPage('studentDashboard');
  };

  const loginAdmin = () => {
    if (adminEmail === ADMIN_EMAIL && adminPassword === ADMIN_PASSWORD) {
      setPage('adminDashboard');
      setAdminTab('dashboard');
      setAdminEmail('');
      setAdminPassword('');
    } else {
      alert('Invalid admin login details.');
    }
  };

  const Home = () => {
    const topResults = results.map((r) => {
      const student = students.find((s) => s.roll === r.roll);
      return { ...r, studentName: student?.name || 'Student', className: student?.className || '-', section: student?.section || '-', ...stats(r) };
    }).sort((a, b) => Number(b.percent) - Number(a.percent)).slice(0, 3);
    const events = [
      { title: 'Annual Day', date: 'Coming Soon', detail: 'Cultural programs, awards and student performances.' },
      { title: 'Sports Day', date: 'Coming Soon', detail: 'Track events, team games and house competitions.' },
      { title: 'Parent-Teacher Meeting', date: 'Coming Soon', detail: 'Parents can meet teachers and discuss student progress.' },
    ];
    const parentInfo = [
      { title: 'Office Timing', value: '9:00 AM - 3:00 PM' },
      { title: 'Fee Counter', value: '10:00 AM - 2:00 PM' },
      { title: 'Required Documents', value: 'Birth Certificate, Aadhaar, Photos, Previous Report Card' },
      { title: 'Contact Number', value: '+91 98765 43210' },
    ];
    const faqs = [
      { question: 'How can students check their result?', answer: 'Students can click Student Login and enter their 5 digit roll number to view their result.' },
      { question: 'What should parents do for admission enquiry?', answer: 'Parents can contact the school office during office timing for admission details and required documents.' },
      { question: 'Where are school notices shown?', answer: 'Latest announcements are shown on the home page and can be updated from the admin dashboard.' },
      { question: 'What documents are required for admission?', answer: 'Birth certificate, Aadhaar card, passport size photos and previous report card are commonly required.' },
    ];
    return <main>
      <section className="px-8 py-20 text-center"><img src={SCHOOL_LOGO} alt="School Logo" className="w-36 h-36 mx-auto mb-8 rounded-full object-cover shadow-xl border-4 border-white" /><h2 className="text-6xl font-extrabold mb-6">Welcome to <span className="text-blue-700">AIIMS</span></h2><p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">A modern school management and result portal where students can securely check results, notices, attendance, and more.</p><button onClick={() => setPage('student')} className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg shadow-lg">Explore Dashboard</button></section>
      <section className="px-8 pb-20"><div className={results.length ? 'max-w-7xl mx-auto bg-green-50 border border-green-200 rounded-3xl p-8 shadow-xl text-center' : 'max-w-7xl mx-auto bg-yellow-50 border border-yellow-200 rounded-3xl p-8 shadow-xl text-center'}><h3 className={results.length ? 'text-3xl font-bold text-green-700 mb-3' : 'text-3xl font-bold text-yellow-700 mb-3'}>{results.length ? '🎉 Congratulations! Latest results are now available.' : '📌 Results will be available soon.'}</h3><p className="text-gray-700 text-lg">{results.length ? 'Students can login using their roll number to check percentage, pass/fail status and rank.' : 'Please keep checking latest announcements for result updates.'}</p><button onClick={() => setPage('student')} className={results.length ? 'mt-6 bg-green-600 text-white px-8 py-4 rounded-2xl font-bold' : 'mt-6 bg-yellow-600 text-white px-8 py-4 rounded-2xl font-bold'}>{results.length ? 'Check Result Now' : 'Go to Student Login'}</button></div></section>
      <section className="px-8 pb-20"><h3 className="text-4xl font-bold text-center mb-12">Portal Features</h3><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">{['Secure Student Login', 'Online Result System', 'Bulk Upload', 'Admin Dashboard'].map((f) => <div key={f} className="bg-white p-8 rounded-3xl shadow-lg"><div className="text-5xl mb-4">📘</div><h4 className="text-xl font-bold mb-3">{f}</h4><p className="text-gray-600">Responsive system designed for students and school administration.</p></div>)}</div></section>
      <section className="px-8 pb-20"><div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"><div className="bg-white rounded-3xl shadow-xl p-10"><p className="text-blue-700 font-bold mb-3">About Our School</p><h3 className="text-4xl font-bold mb-6">Building Bright Futures With Smart Learning</h3><p className="text-gray-600 text-lg leading-relaxed mb-6">AIIMS School focuses on discipline, quality education, digital learning, and student growth.</p><div className="grid grid-cols-1 sm:grid-cols-3 gap-4"><div className="bg-blue-50 p-5 rounded-2xl text-center"><h4 className="text-3xl font-bold text-blue-700">{students.length || '3000+'}</h4><p className="text-gray-600 text-sm mt-1">Students</p></div><div className="bg-green-50 p-5 rounded-2xl text-center"><h4 className="text-3xl font-bold text-green-700">12+</h4><p className="text-gray-600 text-sm mt-1">Classes</p></div><div className="bg-purple-50 p-5 rounded-2xl text-center"><h4 className="text-3xl font-bold text-purple-700">{results.length}</h4><p className="text-gray-600 text-sm mt-1">Results</p></div></div></div><div className="bg-blue-700 text-white rounded-3xl shadow-xl p-10"><p className="font-bold opacity-90 mb-3">Admissions Open</p><h3 className="text-4xl font-bold mb-5">Admissions Open for 2026-27</h3><p className="text-blue-100 text-lg leading-relaxed mb-8">Contact the school office for admission details, fee structure, documents required, and class availability.</p><button onClick={() => setPage('student')} className="bg-white text-blue-700 px-6 py-3 rounded-2xl font-bold">Student Portal</button></div></div></section>
      <section className="px-8 pb-20"><div className="max-w-7xl mx-auto"><h3 className="text-4xl font-bold text-center mb-3 text-blue-700">Top 3 Performers</h3><p className="text-center text-gray-500 mb-12">Only the best 3 students are shown here based on uploaded results.</p><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{topResults.length ? topResults.map((r, index) => <div key={r.roll} className="bg-white rounded-3xl shadow-xl p-8 text-center"><div className="text-5xl mb-4">🏆</div><p className="text-gray-500 font-bold">Rank {index + 1}</p><h4 className="text-2xl font-bold mt-2">{r.studentName}</h4><p className="text-gray-500">Class {r.className} - Section {r.section}</p><div className="mt-5 bg-green-50 text-green-700 rounded-2xl p-4"><p className="text-sm font-semibold">Percentage</p><h5 className="text-3xl font-bold">{r.percent}%</h5></div></div>) : [1, 2, 3].map((x) => <div key={x} className="bg-white rounded-3xl shadow-xl p-8 text-center"><div className="text-5xl mb-4">🏆</div><h4 className="text-2xl font-bold">Topper Name</h4><p className="text-gray-500">Will appear after results are uploaded</p><div className="mt-5 bg-blue-50 text-blue-700 rounded-2xl p-4"><p className="font-semibold">Result Pending</p></div></div>)}</div></div></section>
      <section className="px-8 pb-20"><div className="max-w-7xl mx-auto"><h3 className="text-4xl font-bold text-center mb-12">Upcoming Events</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{events.map((event) => <div key={event.title} className="bg-white rounded-3xl shadow-xl p-8"><div className="text-5xl mb-4">📅</div><h4 className="text-2xl font-bold text-blue-700 mb-2">{event.title}</h4><p className="font-semibold text-gray-500 mb-4">{event.date}</p><p className="text-gray-600 leading-relaxed">{event.detail}</p></div>)}</div></div></section>
      <section className="px-8 pb-20"><div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-10"><h3 className="text-4xl font-bold text-center mb-10 text-blue-700">Parent Information</h3><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{parentInfo.map((info) => <div key={info.title} className="bg-blue-50 p-6 rounded-2xl"><h4 className="text-lg font-bold text-blue-700 mb-2">{info.title}</h4><p className="text-gray-700">{info.value}</p></div>)}</div></div></section>
      <section className="px-8 pb-20"><div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-10"><h3 className="text-4xl font-bold text-center mb-10 text-blue-700">Frequently Asked Questions</h3><div className="space-y-4">{faqs.map((faq) => <div key={faq.question} className="bg-gray-50 p-6 rounded-2xl"><h4 className="text-lg font-bold text-gray-800 mb-2">{faq.question}</h4><p className="text-gray-600">{faq.answer}</p></div>)}</div></div></section>
      <section className="px-8 pb-20"><div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-10"><h3 className="text-4xl font-bold mb-8 text-center text-blue-700">Latest Announcements</h3><div className="space-y-4">{notices.map((n, i) => <div key={i} className="bg-blue-50 border-l-4 border-blue-700 p-5 rounded-2xl"><p className="font-medium text-lg">📢 {n}</p></div>)}</div></div></section>
      <footer className="bg-blue-700 text-white py-10 text-center"><img src={SCHOOL_LOGO} alt="School Logo" className="w-20 h-20 mx-auto mb-4 rounded-full object-cover border-2 border-white" /><h4 className="text-2xl font-bold mb-3">{SCHOOL_NAME}</h4><p className="opacity-90">Built with love! Copyright @2026 Developed by Daris Nisar</p></footer>
    </main>;
  };

  const StudentLogin = () => <main className="min-h-screen flex items-center justify-center p-6"><div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"><h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Student Login</h2><Input value={studentRoll} onChange={(e) => setStudentRoll(cleanRoll(e.target.value))} placeholder="Enter 5 Digit Roll Number" /><button onClick={loginStudent} className="w-full bg-blue-600 text-white p-4 rounded-2xl mt-4 font-bold">Login</button>{studentError && <p className="text-red-600 mt-4 text-center">{studentError}</p>}</div></main>;

  const AdminLogin = () => <main className="min-h-screen flex items-center justify-center p-6"><div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"><h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Admin Login</h2><div className="space-y-4"><Input value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} placeholder="Admin Email" /><Input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="Admin Password" /></div><button onClick={loginAdmin} className="w-full bg-blue-600 text-white p-4 rounded-2xl mt-4 font-bold">Login</button><p className="text-xs text-gray-400 mt-4 text-center">Admin details are hidden for security.</p></div></main>;

  const StudentDashboard = () => {
    const r = results.find((x) => x.roll === studentRoll);
    const st = stats(r);
    const rank = getRankDetails(studentRoll);
    return <main className="p-8 max-w-5xl mx-auto"><div className="bg-white rounded-3xl shadow-xl p-8"><h2 className="text-3xl font-bold text-blue-700 mb-2">Welcome, {loggedStudent?.name}</h2><p className="text-gray-500 mb-6">Roll: {loggedStudent?.roll} | Class {loggedStudent?.className} - Section {loggedStudent?.section}</p><div className="bg-blue-50 rounded-3xl p-6 mb-8"><h3 className="text-2xl font-bold text-blue-700 mb-5">Student Details</h3><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><div className="bg-white p-4 rounded-2xl"><p className="text-sm font-bold text-gray-500">Student Name</p><p className="text-lg font-bold">{loggedStudent?.name || '-'}</p></div><div className="bg-white p-4 rounded-2xl"><p className="text-sm font-bold text-gray-500">Roll Number</p><p className="text-lg font-bold">{loggedStudent?.roll || '-'}</p></div><div className="bg-white p-4 rounded-2xl"><p className="text-sm font-bold text-gray-500">Class</p><p className="text-lg font-bold">{loggedStudent?.className || '-'}</p></div><div className="bg-white p-4 rounded-2xl"><p className="text-sm font-bold text-gray-500">Section</p><p className="text-lg font-bold">{loggedStudent?.section || '-'}</p></div><div className="bg-white p-4 rounded-2xl"><p className="text-sm font-bold text-gray-500">Father Name</p><p className="text-lg font-bold">{loggedStudent?.fatherName || '-'}</p></div><div className="bg-white p-4 rounded-2xl"><p className="text-sm font-bold text-gray-500">Phone Number</p><p className="text-lg font-bold">{loggedStudent?.phone || '-'}</p></div></div></div>{r ? <><h3 className="text-2xl font-bold mb-4">{r.exam} Result</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"><div className="bg-blue-50 p-5 rounded-2xl"><p>Total Marks</p><h3 className="text-2xl font-bold text-blue-700">{st.total} / 400</h3></div><div className="bg-green-50 p-5 rounded-2xl"><p>Percentage</p><h3 className="text-2xl font-bold text-green-700">{st.percent}%</h3></div><div className={st.pass ? 'bg-green-100 p-5 rounded-2xl' : 'bg-red-100 p-5 rounded-2xl'}><p>Status</p><h3 className={st.pass ? 'text-2xl font-bold text-green-700' : 'text-2xl font-bold text-red-700'}>{st.pass ? 'PASS' : 'FAIL'}</h3></div></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"><div className="bg-purple-50 p-5 rounded-2xl"><p>School Rank</p><h3 className="text-2xl font-bold text-purple-700">#{rank.schoolRank}</h3></div><div className="bg-orange-50 p-5 rounded-2xl"><p>Class Rank</p><h3 className="text-2xl font-bold text-orange-700">#{rank.classRank}</h3></div><div className="bg-indigo-50 p-5 rounded-2xl"><p>Section Rank</p><h3 className="text-2xl font-bold text-indigo-700">#{rank.sectionRank}</h3></div></div><div className="mt-8"><h3 className="text-2xl font-bold text-blue-700 mb-5">Subject Wise Marks</h3><div className="space-y-4">{SUBJECTS.map((sub) => { const mark = Number(r[sub.toLowerCase()]); const isPass = mark >= PASS_MARK; return <div key={sub} className={isPass ? 'rounded-3xl p-5 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-100 shadow-lg' : 'rounded-3xl p-5 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-100 shadow-lg'}><div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"><div className="md:col-span-3"><p className="text-sm font-bold text-gray-500">Subject</p><h4 className="text-2xl font-extrabold text-gray-800">{sub}</h4></div><div className="md:col-span-2"><p className="text-sm font-bold text-gray-500">Marks</p><h4 className={isPass ? 'text-4xl font-extrabold text-blue-700' : 'text-4xl font-extrabold text-red-700'}>{mark}/100</h4></div><div className="md:col-span-5"><p className="text-sm font-bold text-gray-500 mb-2">Performance</p><div className="w-full bg-white rounded-full h-4 overflow-hidden"><div className={isPass ? 'bg-blue-600 h-4 rounded-full' : 'bg-red-600 h-4 rounded-full'} style={{ width: `${Math.min(mark, 100)}%` }}></div></div></div><div className="md:col-span-2 md:text-right"><span className={isPass ? 'inline-block text-sm font-bold bg-green-600 text-white px-4 py-2 rounded-full' : 'inline-block text-sm font-bold bg-red-600 text-white px-4 py-2 rounded-full'}>{isPass ? 'PASS' : 'FAIL'}</span></div></div></div>; })}</div></div></> : <div className="bg-yellow-50 p-6 rounded-2xl text-yellow-700 font-semibold">Result not uploaded yet.</div>}</div></main>;
  };

  const StudentForm = () => <div className="bg-blue-50 rounded-3xl p-5 mb-6"><h3 className="font-bold text-blue-700 mb-4">Add / Edit Student Details</h3><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><label><span className="text-sm font-bold text-gray-600 mb-2 block">Student Name</span><Input value={studentData.name} onChange={(e) => setStudentData({ ...studentData, name: e.target.value })} placeholder="Enter student name" /></label><label><span className="text-sm font-bold text-gray-600 mb-2 block">Roll Number</span><Input value={studentData.roll} onChange={(e) => setStudentData({ ...studentData, roll: cleanRoll(e.target.value) })} placeholder="Enter 5 digit roll number" /></label><label><span className="text-sm font-bold text-gray-600 mb-2 block">Class</span><Input value={studentData.className} onChange={(e) => setStudentData({ ...studentData, className: e.target.value })} placeholder="Enter class" /></label><label><span className="text-sm font-bold text-gray-600 mb-2 block">Section</span><Input value={studentData.section} onChange={(e) => setStudentData({ ...studentData, section: e.target.value })} placeholder="Enter section" /></label><label><span className="text-sm font-bold text-gray-600 mb-2 block">Father Name</span><Input value={studentData.fatherName} onChange={(e) => setStudentData({ ...studentData, fatherName: e.target.value })} placeholder="Enter father name" /></label><label><span className="text-sm font-bold text-gray-600 mb-2 block">Phone Number</span><Input value={studentData.phone} onChange={(e) => setStudentData({ ...studentData, phone: cleanPhone(e.target.value) })} placeholder="Enter phone number" /></label></div></div>;

  const AdminDashboard = () => <main className="p-6 max-w-7xl mx-auto"><div className="bg-white rounded-3xl shadow-xl p-6"><div className="flex flex-wrap gap-3 mb-6">{['dashboard', 'students', 'results', 'notices'].map((tab) => <button key={tab} onClick={() => setAdminTab(tab)} className={adminTab === tab ? 'bg-blue-600 text-white px-5 py-3 rounded-2xl font-bold capitalize' : 'bg-gray-100 px-5 py-3 rounded-2xl font-bold capitalize'}>{tab}</button>)}</div>{message && <div className="bg-green-50 text-green-700 p-4 rounded-2xl mb-6 font-semibold">{message}</div>}
    {adminTab === 'dashboard' && <div><h2 className="text-2xl font-bold mb-4">Welcome Admin 👋</h2><p className="text-gray-600 mb-8">Select an action above to manage the school portal.</p><div className="bg-blue-50 rounded-3xl p-6"><h3 className="text-2xl font-bold text-blue-700 mb-5">Class Performance Summary</h3>{classPerformanceSummary.length ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{classPerformanceSummary.map((item) => <div key={item.className} className="bg-white rounded-2xl p-5 shadow"><p className="text-gray-500 font-semibold">Class {item.className}</p><h4 className="text-3xl font-bold text-blue-700 mt-2">{item.average}%</h4><p className="text-sm text-gray-500 mt-2">Average from {item.students} result{item.students > 1 ? 's' : ''}</p></div>)}</div> : <div className="bg-white p-5 rounded-2xl text-gray-500">No class performance data yet. Upload results to see class averages.</div>}</div></div>}
    {adminTab === 'students' && <div><h2 className="text-2xl font-bold mb-4">Manage Students</h2>{StudentForm()}<button onClick={addStudent} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold mb-8">{editingStudentRoll ? 'Update Student' : 'Add Student'}</button><div className="bg-gray-50 p-5 rounded-2xl mb-6"><h3 className="font-bold mb-3">Bulk Add Students</h3><p className="text-sm text-gray-500 mb-3">Format: roll,name,class,section,father,phone</p><textarea value={bulkStudents} onChange={(e) => setBulkStudents(e.target.value)} className="w-full border p-4 rounded-2xl h-28" placeholder="10001,Ali,10,A,Mr Khan,9876543210" /><div className="flex flex-wrap gap-3 mt-3"><button onClick={() => { const report = importStudents(bulkStudents); show(`${report.added} students added. ${report.skipped} skipped.`); setBulkStudents(''); }} className="bg-green-600 text-white px-5 py-3 rounded-2xl font-bold">Import Pasted Students</button><input type="file" accept=".csv,.txt" onChange={(e) => uploadFile(e, importStudents, 'students')} /></div></div><div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4"><Input value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} placeholder="Search students" /><Select value={studentClassFilter} onChange={(e) => setStudentClassFilter(e.target.value)} label="Classes" options={classOptions} /><Select value={studentSectionFilter} onChange={(e) => setStudentSectionFilter(e.target.value)} label="Sections" options={sectionOptions} /></div><button onClick={() => downloadCSV('students.csv', [['Roll','Name','Class','Section','Father','Phone'], ...students.map((s) => [s.roll, s.name, s.className, s.section, s.fatherName, s.phone])])} className="bg-gray-800 text-white px-5 py-3 rounded-2xl mb-4">Export Students CSV</button><div className="space-y-3"><div className="hidden lg:grid grid-cols-7 gap-3 bg-blue-600 text-white font-bold p-4 rounded-2xl"><p>Name</p><p>Roll</p><p>Class</p><p>Section</p><p>Father Name</p><p>Phone Number</p><p>Action</p></div>{filteredStudents.map((s) => <div key={s.roll} className="border p-5 rounded-2xl bg-white"><div className="grid grid-cols-1 lg:grid-cols-7 gap-3 items-center"><p><span className="lg:hidden font-bold text-gray-600">Name: </span>{s.name}</p><p><span className="lg:hidden font-bold text-gray-600">Roll: </span>{s.roll}</p><p><span className="lg:hidden font-bold text-gray-600">Class: </span>{s.className}</p><p><span className="lg:hidden font-bold text-gray-600">Section: </span>{s.section}</p><p><span className="lg:hidden font-bold text-gray-600">Father Name: </span>{s.fatherName || '-'}</p><p><span className="lg:hidden font-bold text-gray-600">Phone Number: </span>{s.phone || '-'}</p><div className="flex gap-2"><button onClick={() => { setStudentData(s); setEditingStudentRoll(s.roll); }} className="bg-yellow-500 text-white px-4 py-2 rounded-xl">Edit</button><button onClick={() => setStudents(students.filter((x) => x.roll !== s.roll))} className="bg-red-600 text-white px-4 py-2 rounded-xl">Delete</button></div></div></div>)}</div></div>}
    {adminTab === 'results' && <div><h2 className="text-2xl font-bold mb-4">Manage Results</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"><Input value={resultData.roll} onChange={(e) => setResultData({ ...resultData, roll: cleanRoll(e.target.value) })} placeholder="Roll Number" /><Input value={resultData.exam} onChange={(e) => setResultData({ ...resultData, exam: e.target.value })} placeholder="Exam Name" /><Input value={resultData.maths} onChange={(e) => setResultData({ ...resultData, maths: e.target.value })} placeholder="Maths" /><Input value={resultData.science} onChange={(e) => setResultData({ ...resultData, science: e.target.value })} placeholder="Science" /><Input value={resultData.english} onChange={(e) => setResultData({ ...resultData, english: e.target.value })} placeholder="English" /><Input value={resultData.computer} onChange={(e) => setResultData({ ...resultData, computer: e.target.value })} placeholder="Computer" /></div><button onClick={addResult} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold mb-8">{editingResultRoll ? 'Update Result' : 'Upload Result'}</button><div className="bg-gray-50 p-5 rounded-2xl mb-6"><h3 className="font-bold mb-3">Bulk Add Results</h3><p className="text-sm text-gray-500 mb-3">Format: roll,exam,maths,science,english,computer</p><textarea value={bulkResults} onChange={(e) => setBulkResults(e.target.value)} className="w-full border p-4 rounded-2xl h-28" placeholder="10001,Mid Term,80,75,90,88" /><div className="flex flex-wrap gap-3 mt-3"><button onClick={() => { const report = importResults(bulkResults); show(`${report.added} results imported. ${report.skipped} skipped.`); setBulkResults(''); }} className="bg-green-600 text-white px-5 py-3 rounded-2xl font-bold">Import Pasted Results</button><input type="file" accept=".csv,.txt" onChange={(e) => uploadFile(e, importResults, 'results')} /></div></div><div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4"><Input value={resultSearch} onChange={(e) => setResultSearch(e.target.value)} placeholder="Search results" /><Select value={resultClassFilter} onChange={(e) => setResultClassFilter(e.target.value)} label="Classes" options={classOptions} /><Select value={resultSectionFilter} onChange={(e) => setResultSectionFilter(e.target.value)} label="Sections" options={sectionOptions} /></div><button onClick={() => downloadCSV('results.csv', [['Roll','Exam','Maths','Science','English','Computer','Percentage','Status'], ...results.map((r) => [r.roll, r.exam, r.maths, r.science, r.english, r.computer, stats(r).percent, stats(r).pass ? 'PASS' : 'FAIL'])])} className="bg-gray-800 text-white px-5 py-3 rounded-2xl mb-4">Export Results CSV</button><div className="space-y-3">{filteredResults.map((r) => { const s = students.find((x) => x.roll === r.roll); const st = stats(r); return <div key={r.roll} className="border p-4 rounded-2xl flex justify-between gap-4 flex-wrap"><div><b>{s?.name || 'Unknown Student'}</b><p className="text-gray-500">Roll {r.roll} | {r.exam} | {st.percent}% | {st.pass ? 'PASS' : 'FAIL'}</p></div><div className="flex gap-2"><button onClick={() => { setResultData(r); setEditingResultRoll(r.roll); }} className="bg-yellow-500 text-white px-4 py-2 rounded-xl">Edit</button><button onClick={() => setResults(results.filter((x) => x.roll !== r.roll))} className="bg-red-600 text-white px-4 py-2 rounded-xl">Delete</button></div></div>; })}</div></div>}
    {adminTab === 'notices' && <div><h2 className="text-2xl font-bold mb-4">Manage Notices</h2><div className="flex gap-3 mb-6"><input value={noticeText} onChange={(e) => setNoticeText(e.target.value)} placeholder="Write notice" className="flex-1 border p-4 rounded-2xl" /><button onClick={() => { if (noticeText.trim()) { setNotices([noticeText.trim(), ...notices]); setNoticeText(''); show('Notice added.'); } }} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold">Add</button></div><div className="space-y-3">{notices.map((n, i) => <div key={i} className="border p-4 rounded-2xl flex justify-between gap-4"><p>{n}</p><button onClick={() => setNotices(notices.filter((_, index) => index !== i))} className="bg-red-600 text-white px-4 py-2 rounded-xl">Delete</button></div>)}</div></div>}
  </div></main>;

  return <div className="min-h-screen bg-gray-100 text-gray-900 overflow-x-hidden"><header className="bg-white shadow sticky top-0 z-50"><div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4"><div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start"><img src={SCHOOL_LOGO} alt="School Logo" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" /><div className="text-center sm:text-left"><h1 className="text-base sm:text-xl font-bold text-blue-700 leading-tight">{SCHOOL_NAME}</h1><p className="text-[10px] sm:text-xs text-gray-500">{SCHOOL_TAGLINE}</p></div></div><nav className="w-full sm:w-auto grid grid-cols-3 sm:flex gap-2 bg-blue-50/70 p-2 rounded-2xl border border-blue-100 shadow-inner"><button onClick={() => setPage('home')} className={page === 'home' ? 'px-3 sm:px-5 py-2 rounded-xl bg-blue-600 text-white font-bold shadow-lg transition-all duration-300 text-sm sm:text-base' : 'px-3 sm:px-5 py-2 rounded-xl font-bold text-gray-700 hover:text-blue-700 hover:bg-white hover:shadow-md transition-all duration-300 text-sm sm:text-base'}>Home</button><button onClick={() => setPage('student')} className={page === 'student' || page === 'studentDashboard' ? 'px-3 sm:px-5 py-2 rounded-xl bg-blue-600 text-white font-bold shadow-lg transition-all duration-300 text-sm sm:text-base' : 'px-3 sm:px-5 py-2 rounded-xl font-bold text-gray-700 hover:text-blue-700 hover:bg-white hover:shadow-md transition-all duration-300 text-sm sm:text-base'}>Student</button><button onClick={() => setPage('admin')} className={page === 'admin' || page === 'adminDashboard' ? 'px-3 sm:px-5 py-2 rounded-xl bg-blue-600 text-white font-bold shadow-lg transition-all duration-300 text-sm sm:text-base' : 'px-3 sm:px-5 py-2 rounded-xl font-bold text-gray-700 hover:text-blue-700 hover:bg-white hover:shadow-md transition-all duration-300 text-sm sm:text-base'}>Admin</button></nav></div></header>{page === 'home' && Home()}{page === 'student' && StudentLogin()}{page === 'admin' && AdminLogin()}{page === 'studentDashboard' && StudentDashboard()}{page === 'adminDashboard' && AdminDashboard()}</div>;
}
