import{U as f,r as i,u as h,a as j,b as x,P as m,I as b,j as e}from"./index-wkMY94pX.js";const v="https://leonelSubelza.github.io/Sistema-Productos/assets/TiendaHumilde-logo-OFC_lBCj.png";async function N(o,l){let n={email:o,password:l};try{const a=await fetch(f+"/api/usuarios/login",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(n)});return a.ok?(await a.json(),!0):!1}catch(a){return console.error("Error:",a),!1}}function L(){const[o,l]=i.useState(""),[n,a]=i.useState(""),t=h(s=>s.pageDetails),r=j(),[d,c]=i.useState(""),{updateValuePageDetail:g}=x(),p=()=>{o!==""&&N(o,n).then(s=>{s?(g("sessionStarted",!0),r(m.PRODUCTS)):alert("Las credenciales son incorrectas. Por favor intente nuevamente.")}).catch(s=>{console.log(s)})},u=()=>{r("/")};return i.useEffect(()=>{t&&t.sessionStarted&&r(m.PRODUCTS),!t.pageLogo||t.pageLogo===""?c(v):c(b+t.pageLogo+"?timestamp="+new Date().getTime())},[]),e.jsx("div",{className:"fondo",children:e.jsxs("div",{className:"container-img-login",children:[e.jsx("div",{className:"imagen",children:e.jsx("img",{src:"https://random.imagecdn.app/200/400",alt:""})}),e.jsxs("div",{className:"container-login",children:[e.jsx("img",{src:d,alt:"",className:"login-logo"}),e.jsxs("form",{className:"form-login",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"form-email",className:"form-label",children:"Email"}),e.jsx("input",{value:o,onChange:s=>l(s.target.value),type:"email",className:"form-control",id:"form-email",placeholder:"name@example.com"})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"form-password",className:"form-label",children:"Contraseña"}),e.jsx("input",{value:n,onChange:s=>a(s.target.value),type:"password",className:"form-control",id:"form-password",placeholder:"Contraseña"})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("button",{onClick:p,type:"button",className:"btn btn-dark",children:"Iniciar Sesión"}),e.jsx("button",{onClick:u,type:"button",className:"btn btn-dark",style:{marginLeft:"10px"},children:"Volver"})]})]})]})]})})}export{L as default};
