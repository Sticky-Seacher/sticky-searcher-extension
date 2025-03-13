# Sticky Searcher

<p align="center"><img src="https://github.com/user-attachments/assets/b199caad-8c73-4398-9a93-b70f5f66d4c5" height="128px" width="128px"></p>

<p align="center"> "Sticky Searcher"는 구글에서 검색어를 입력하면 관련된 문구들이 자동으로 하이라이팅 표시되며,<br>
검색을 통해 얻고자 했던 정보들에 빠르게 도달할 수 있는 크롬 확장 프로그램입니다.</p>

# 링크

[Sticky Searcher 웹사이트](https://github.com/Sticky-Seacher/sticky-searcher-website) |
[Sticky Searcher 확장프로그램](https://github.com/Sticky-Seacher/sticky-searcher-extension)

# 목차

1. [Sticky Searcher](#sticky-searcher)
   - 크롬 확장 프로그램 개요
2. [Motive](#motive)
   - 목적과 문제 해결
3. [팀원 소개](#팀원-소개)
   - 팀원 소개
4. [시연 영상](#시연-영상)
   - 프로젝트 시연 영상
5. [기술 스택](#기술-스택)
   - 프론트엔드 기술
   - 백엔드 기술
   - Firebase 필요성과 이유
6. [트러블슈팅 + 도전과제](#challenges-트러블-슈팅)
   - 텍스트 콘텐츠를 찾고 하이라이팅하는 방법
   - 확장 프로그램에서 현재 페이지 접근하기
   - 올바른 타이밍에 이벤트 발동하기
   - 아이콘, UI 스크래핑 문제 해결
7. [로그인 리다이렉션](#login-redirection)
   - 에러 상황과 해결 방안
8. [웹사이트 드래그 앤 드롭 구현](#웹사이트-드래그-앤-드롭-구현)
   - 마우스 이벤트 처리
   - `useRef()`를 사용한 드래그된 항목 추적
   - 드래그 앤 드롭 문제 해결
9. [localStorage 값 변할 때 데이터 가져오기](#localstorage-값-변할-때-데이터-가져오기)
   - localStorage 값 변화를 감지하는 방법
10. [회고록](#회고록)
    - 팀원들의 인사이트와 경험

# 개발 배경

우리는 검색창에 궁금했던 단어나 문장을 입력하고 원하는 정보를 빠르게 얻어 가길 원합니다.<br>
하지만 불필요한 설명들이 포함되어 있어 원했던 정보를 찾기까지 수많은 스크롤을 해야 하는 불편함이 있었습니다.<br>
저희는 사용자의 평소 익숙했던 환경을 편리하게 개선해 주고자 해당 프로젝트를 진행하게 되었습니다.

# 시연 영상

### 확장 프로그램

[![Video Label](https://github.com/user-attachments/assets/28ec8715-7f1a-4b73-8fe8-ebdb6df54986)](https://youtu.be/Ns1vQ6nq1OU)

### 웹사이트

[![Video Label](https://github.com/user-attachments/assets/44bf694b-fd65-4eb6-87f2-b02478162cd8)](https://youtu.be/oc8xGLn2KfQ)

# 기술 스택

### **Frontend**

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">
<img src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white">
<img src="https://img.shields.io/badge/DaisyUI-1AD1A5?style=for-the-badge&logo=DaisyUI&logoColor=white">
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white">

### **Backend**

<img src="https://img.shields.io/badge/Firebase-DD2C00?style=for-the-badge&logo=Firebase&logoColor=white">

# 개발 과정

### 특정 text 콘텐츠를 어떻게 찾고 하이라이팅 할까?

사실 window.find()라는 특정 텍스트를 찾아주고 어떤 브라우저에서는 하이라이팅 처리도 해주는 메서드가 있었습니다. 그러나 이는 비표준 기능이었기 때문에 배포단계에 문제가 생길 수도 있었습니다. 표준 기능들을 사용해서 특정 text content를 찾고 하이라이팅하기 위해 4가지의 어려움이 있었습니다.

- extension계층에서, 사용자가 보고 있는 현재 페이지에 어떻게 접근 하는 가?
- 원하는 타이밍에 발동 시킬 수 있는 가?
- 특정 text 콘텐츠를 찾기 위해 DOM 탐색을 어떻게 할 것 인 가?
- 어떻게 하이라이팅 시킬 것인 가? </aside>

### **extension 계층에서, 사용자가 보고 있는 현재 페이지에 어떻게 접근 하는 가?**

여러 사이트를 넘나드는 기능을 구현하는 만큼 extension으로 구현을 진행하고 있습니다. 그런데 사이드 패널 세상에 갇혀있는 상태라 브라우저의 다른 부분들에 접근하기 위해서는 해당 부분을 칭하는 정의와 할 수 있는 작업에 대해 알아야 했습니다. extension 개발을 처음 진행하는 만큼 공식문서를 통해 계층 정의를 먼저 선행했습니다.

사용자가 보고 있는 페이지 영역은 content_script이며 이 영역에서 할 작업들을 manifest의 content_scripts의 키에 값으로 선언해 놓으면 되었습니다. 그러면 기존 브라우저에서 개발하던 대부분의 기능을 사용할 수 있었습니다.

### 원하는 타이밍에 발동 시킬 수 있는 가?

extension 계층 마다 할 수 있는 작업이 달라 원하는 타이밍에 원하는 작업을 발동 시키는 것은 조금 복잡했습니다.

- content_script에 접근해야 하는 타이밍
  - 구글 검색 완료 페이지에 사용자가 위치했을 때
  - 구글 검색 완료 페이지 중 특정 링크를 눌러 이동한 페이지에서, “Start Searcher” 버튼을 클릭했을 때

해당 타이밍들은 세세한 제약 사항들이 존재합니다. 하이라이팅 처리를 하고 SPA 페이지에 대응하기 위해, 단순히 페이지가 로드된 순간이 아니라 DOM 형성이 완료된 순간을 감지 할 수 있어야 했습니다.

이는 background 영역이 책임을 가지고 있기에 추가적으로 background와 content_script 사이의 통신도 필요했습니다. 또한 버튼을 클릭한 순간 이벤트가 발생되고 결과 데이터를 얻어야 하므로 side_panel과의 통신도 필요했습니다.

- 추가된 요구사항
  - DOM이 형성되었을 때
  - tab의 URL이 특정 URL일 때
  - background ↔ content_script 통신
  - side_panel ↔ content_script 통신

결과적으로 background에서는 DOM 형성이 완료된 순간에 이벤트를 걸었습니다. 특정 URL에 위치해있다는 사실도 함께 확인 된다면 content_script에게 sendMessage 함수로 통신을 시도합니다.

side_panel에서는 특정 버튼에 클릭이벤트 핸들러를 걸었습니다. 특정 URL에 위치해있다는 사실도 함께 확인 된다면 content_script에게 sendMessage 함수로 통신을 시도합니다.

content_script에게도 메시지도 도달한 순간을 감지하는 이벤트를 걸었습니다. content_script는 다양한 메시지를 수신 받는 만큼 requset를 분간하는 작업을 거칩니다. 특정 request 라는 것이 확인되면 content_script는 DOM 탐색 작업을 거칠 것입니다.

### 특정 text 콘텐츠를 찾기 위해 DOM 탐색을 어떻게 할 것 인가?

document.querySelector 등은 이미 특정 요소를 찾는 메서드 였습니다. 현재 프로젝트에서는 요소의 conten인 text를 찾아야 하기 때문에 사용하기에는 어려웠습니다.

DOM이 트리구조라는 것에서 착안하여 이진 트리 알고리즘을 다음 사항으로 검토해보았으나, DOM의 노드는 자식의 갯수가 2개로 한정되어 있지 않기 때문에 사용하기에는 어려웠습니다.

페이지의 tag들을 string으로 받아서 text를 발견하는 것도 아이디어로 생각해 보았으나 결국 사용자의 화면에 리페인팅 없이 반영하기 위해서는 element 삽입이 필요하며 결국 DOM에서의 삽입 위치를 알아야하기 때문에 아이디어를 발전시키는 사항은 보류처리했습니다.

조사를 거친 끝에 DOM을 순회하는 메서드를 발견했습니다. NodeIterator와 TreeWalker 입니다. 두 메서드 모두 루트 노드를 제공할 수 있고, 탐색 할 노드의 타입을 명시할 수 있고, 탐색을 이어갈 지 멈출지도 결정할 수 있었습니다.

사용자가 보는 화면을 대응하고 싶었기에 body tag를 루트 노드로 제공하고, text content에 관심이 있었기에 text node들만 탐색할 수도 있었습니다. NodeIterator가 먼저 출시되고 이후에 TreeWalker가 출시 되었습니다.

둘의 가장 큰 차이점으로, TreeWalker는 노드를 순회할 때 다양한 방향으로 갈 수 있다는 것이었습니다. 저희 프로젝트에서는 다음 노드로만 가면 되었기에 복잡성을 줄이고자 NodeIterator를 사용했습니다.

### 어떻게 하이라이팅 시킬 것 인가?

text content를 하이라이팅 시키고 이후 스크롤 초점을 부여하기 위해 text를 tag로 감싸는 과정이 필요했습니다. 처음에는 text를 담고 있는 leaf Elemenet에서 innerHTML로 content를 얻은 다음 replace로 해당 text를 tag로 감싸진 html string으로 바꿔친 다음에 다시 innerHTML을 사용하는 방법을 썼습니다.

- 트러블슈팅 대상 코드

```jsx
const origin = targetElement.innerHTML;

let replace = origin;

replace = replace.replace(
  keyword,
  `<span style="background:${color}">${keyword}</span>`
);

targetElement.innerHTML = replace;
```

그러나 이 방법은 tag의 속성과 기능들을 고려하지 못한 방법이었습니다. 예로 다음과 같은 tag 문법 위반 사례가 발생합니다.

- 오류 화면

```html
<!-- 예 : class를 키워드로 할 경우, 다음과 같은 상황이 됨 -->
<a ... <span class='highlight'>class</span>="somethingClassName" />
```

이에 html을 string으로 다루는 방법을 폐기하고 DOM을 조작하기로 했습니다. 이 과정에서 jsbin과 debugger의 효과를 채감할 수 있었습니다. jsbin으로 작은 단위의 DOM에서 우선 작은 기능 구현을 성공했습니다. 특히 만약 키워드 text content가 전체 content의 맨 앞에 있거나 맨 뒤에 있을 경우 등의 엣지케이스를 검증했습니다.

그리고 MDN 사이트 등 본격적인 사이트에서 콘솔 탭을 열어 해당 함수를 적용시켜 보았고, debugger를 쓰면서 점진적으로 하나씩 하이라이트가 찍히는 모습과 해당하는 코드 로직을 따라가며 버그를 잡아 냈습니다.

결과적으로 leaf Element를 대상으로 NodeIterator로 순회하면서 input이나 textarea는 탐색에서 제외했습니다. 키워드 text를 기준으로 split한 후, 키워드 아닌 것은 text Node화 해서 삽입하고 키워드 인 것은 element화 해서 삽입했습니다. 그리고 기존 text는 삭제 처리했습니다. 그 결과 무사히 기능 구현이 가능했습니다.

- 개선된 코드

```jsx
function setHighlight(keyword, targetElement, color) {
  const textNodeIterator = document.createNodeIterator(
    targetElement,
    NodeFilter.SHOW_TEXT
  );

  for (
    let currentTextNode = textNodeIterator.nextNode();
    currentTextNode;
    currentTextNode = textNodeIterator.nextNode()
  ) {
    const parentElement = currentTextNode.parentElement;

    if (
      parentElement.tagName.toLowerCase() === "input" ||
      parentElement.tagName.toLowerCase() === "textarea"
    ) {
      continue;
    }

    const text = currentTextNode.textContent;

    const excludedList = text.split(keyword);

    excludedList.forEach((stringFragment, index) => {
      const notKeywordText = document.createTextNode(stringFragment);
      parentElement.insertBefore(notKeywordText, currentTextNode);

      if (index !== excludedList.length - 1) {
        const highlightedSpan = document.createElement("span");
        highlightedSpan.textContent = keyword;
        highlightedSpan.style = `background:${color}`;
        highlightedSpan.dataset.highlight = keyword;
        parentElement.insertBefore(highlightedSpan, currentTextNode);
      }
    });

    parentElement.removeChild(currentTextNode);
  }
}
```

## description을 어떻게 찾고 자동으로 스크롤 될까?

저희 팀은 공통된 단어로 소통하는 것을 중요시 하여 다음과 같은 것을 description이라 명명해서 사용했습니다.

- 이동 당한 페이지에서 description을 어떻게 찾을 것인가?
- 어떻게 링크 클릭시 자동으로 스크롤이 촉발되게 할 것인가?
- 얼만큼 미리 저장해 놓을 것인가?

### 이동 당한 페이지에서 description을 어떻게 찾을 것인가?

### 어떻게 링크 클릭시 자동으로 스크롤이 촉발되게 할 것인가?

정확도를 높이고 스크롤을 자동으로 작동 시키게 하기 위해 text-fragment를 사용했습니다. 키워드와는 달리 description은 한 번만 스크롤되면 되고, 중간에 여러 tag들이 끼워져 있어도 텍스트들만 대상으로 하기에 정확성도 높았습니다.

사용방법도 url에 fragment를 추가하여 사용이 가능했습니다. 이를 위해서는 다음에 해당 링크를 클릭 시 fragment가 적용된 url로 리다이렉션을 시키는 것이 필요했습니다.

- 추가된 고려사항
  - 얼만큼 미리 저장해 놓을 것인가?
  - 리다이렉션을 어떻게 시킬 것인가?

사실 URL과 description은 사용자가 해당 링크를 클릭하지 않을 수도 있어 쓰지 않을 수도 있는 임시 데이터입니다. 이에 클라이언트상에 저장해 놓기로 했습니다.

한정적인 저장공간을 고려하여, 사용자가 구글 검색 페이지를 이동할 때 마다 새로이 저장하며, 해당 탭을 닫으면 제거되도록 로직을 구현했습니다.

클라이언트 상에는 저장 공간이 여럿인데, 이 중 extension에서 접근이 자유로운 chrome storage 선택했습니다. chrome storage에 변경이 감지되면 새로운 리다이렉션 룰을 설정합니다.

리다이렉션 룰을 설정할 때는, chrome storage에 저장해 놓은 URL과 description을 text fragment와 결합하여 리다이렉션 도착지로 사용될 새로운 URL을 생성해 룰을 지정했습니다. background에서 declarativeNetRequest를 사용하여 네트워크 요청에 접근 할 때 생성된 룰을 활용했습니다.

## 로그인 리다이렉션 오류 해결

### 해당 상황에서 어떤 문제들이 있을 수 있었는지?

- 로그인을 성공하더라도 사용자의 이메일이나 인증 토큰이 제대로 설정되지 않으면, <br> 상태를 유지하지 못하고 다시 로그인 페이지로 돌아가는 상황입니다.

### **인증 토큰(accessToken)이란?**

- "로그인 인증을 위한 증명서" 같은 개념입니다.<br>
  우리가 로그인을 할 때 사용하는 비밀번호처럼 사용자가 제대로 로그인했는지 시스템이 확인할 수 있습니다.

### **해결방안**

- 사용자의 이메일 값을 가져와 조건을 주는 시도를 하려다 이메일 정보만 알면 제 3자가 로그인을 할 수 있는 보안의 이슈가 있어 고유한 값인 인증 토큰을 갖고와서 조건을 걸어주었습니다.

### **해결 전 코드**

```
const ProtectedRoute = ({ element }) => {
  const { userId } = useUserId();

  if (!userId) {
    return <Navigate to="/login" />;
  } else {
    return <>{element}</>;
  }
};
```

### **해결 후 코드**

```
const ProtectedRoute = ({ element }) => {
  const { userId } = useUserId();
  const accessToken = localStorage.getItem("userAccessToken");

  if (userId || accessToken) {
    return <>{element}</>;
  }

  return (
    <Navigate
      to="/login"
      replace
    />
  );
};
```

## 웹사이트 드래그앤드롭 기능 구현 순서

### 1. **마우스 이벤트 처리**

- `mousedown` (마우스 버튼 누름): 사용자가 요소를 드래그하거나 놓을 때 발생하는 여러 이벤트를 처리합니다.
- `mousemove` (마우스 이동): 요소로 드래그하는 동안 추적합니다.
- `mosueup` (마우스 버튼 떼기): 마우스를 놓을 때 발생하며, 드래그가 끝나는 시점을 추적합니다.

### 2. **마우스 이벤트 속성 `draagable`**

- draagable는 `true`인 값은 대표적으로 `<a>` 태그가 있고 반면에 `<span>`태그는 불가합니다.

### 2-1. `dragenter` / `dragstart` / `dragleave` 속성이란?

- `dragenter` 이벤트를 적용한 요소에 드래그한 아이템이 닿을 경우 콜백함수가 실행됩니다.
- `dragstart` 이벤트를 적용한 요소에 드래그한 아이템이 위치하면 계속해서 콜백함수가 실행됩니다.
- `dragleave` 이벤트는 드래그 중인 요소가 자신을 감싸고 있던 영역을 벗어 났을 때 콜백함수가 실행된다. `e.preventDefault()`를 사용하게 된다면 이벤트 동작이 겹치는 것을 방지합니다.
- `dragend` 이벤트는 드래그를 끝낼 시에 콜백 함수가 실행됩니다.

### 3. `useRef()` **드래그되는 항목 추적**

- `useRef()` 는 변수명에 초기값을 적는 식으로 만들어 결과값을 `{ current: 초기값 }` 을 지닌 객체가 반환됩니다.
- `dragstart` 는 콜백함수의 매개변수로 그룹인덱스와 와 키워드의 `초기값` 을 받고있습니다.
- 드랍은 `event`, `groupIndex` 를 매개변수로 받고있고 `newList`라는 변수명에 기존에 있던 list들의 배열을 불러오고있습니다.
- `newList` 드래그된 그룹의 인덱스들의 키워드들을 배열안에서 필터링하여<br> 키워드랑 일치한지 아닌지 구분하여 새로운 배열을 반환합니다.

- `dragPosition.current`: 드래그가 시작된 위치 <br>(즉, 키워드의 그룹 인덱스와 키워드)를 저장합니다.

### 4. 해당 상황에서 어떤 문제들이 있을 수 있었는지?

- 2개의 그룹이 있다면 영역내에 드래그한 요소를 다른 박스로 옮길 때 삭제되거나 중복되어 추가되는 상황이 있었습니다.

### 5. **해결 방안**

- 기존 그룹내에 리스트 요소들이 있다면 `index`가 중요하고<br>
  각 해당되는 리스트들의 고유한 `key`값을 주었더니 해결되었습니다.

## localStorage value가 변할 때 데이터 가져오기

- **상황**
  1.  사용자 식별을 위해 사용자 localStorage에 이메일을 저장하여 사용하도록 기획
  2.  로그인 이전에는 사용자 데이터가 존재하지 않고, 사용자가 로그인을 하더라도 아래의 코드로는 변화를 감지하지 않아 storage에는 계속 “userEmail”의 value가 null로 저장되어 있어 사용자 식별이 불가함

```jsx
if (request.message === "Get user authentication") {
  localStorage.setItem("userEmail", request.emailData);
}
```

- **해결**
  1.  수동으로 이벤트를 강제시키는 window.dispatchEvent 사용(매개변수로 이벤트 객체를 받음)
  2.  storage의 값이 변경될 때마다 발생하는 “storage”이벤트 객체를 매개변수로 전달하여 value의 변화를 감지

```jsx
if (request.message === "Get user authentication") {
  localStorage.setItem("userEmail", request.emailData);
  window.dispatchEvent(new Event("storage"));
}
```

# 팀원 소개

- 이종석: josuk0212@gmail.com

- 김소연: hong7ya@gmail.com

- 김연주: mpnisck@gmail.com

# 회고록

- ### 이종석

  “개발은 혼자하는 것이 아니다.”

  본 프로젝트를 진행하면서 가장 많이 느꼈던 점입니다. 사소한 부분부터 중대한 사안까지 모든 것을 회의를 통해 결정되고 진행을 해야한다는 점이 프로젝트 초반에 힘든 부분이었습니다. 의견을 조율해가는 과정에서 간혹 서로의 언성이 높아져 분위기가 냉랭해지기도 했지만, 각자 생각할 시간을 가지고 차분히 대화로 관계를 풀어가는 과정이 좋았습니다.

  더하여 프로젝트를 위해 팀원 모두가 잠을 줄여가며 진행했는데, 아무리 힘들더라도 팀 규칙을 지키기 위해 책임감을 가지고 맡은 바를 해낸 팀원들에게 감사했습니다. 이를 보며 자극되기도 하며, 서로 힘들 때 의지하고 서로에게 긍정적인 시너지를 주고 받을 수 있다는 점이 팀 프로젝트의 가장 큰 장점인 것 같습니다.

  팀 프로젝트를 통해 소속감과 책임감을 상기시킬 수 있는 좋은 기회가 되었습니다.

- ### 김소연

  팀 프로젝트를 진행하면서 좋은 팀원들을 만나 협업 능력을 기를 좋은 기회였습니다. 서로 중요하게 여기는 부분이 달랐기 때문에, 의견을 효율적으로 공유하는 데 노력을 쏟았습니다.

  어필하기 위한 근거는 예시 코드만 한 것이 없다는 것을 체감한 이후에는 실제로 jsbin으로 예시 코드를 작성해서 시연하기도 하고, 건강한 피드백을 주고받기 위해 서로를 믿고 각자 돌아가면서 솔직하게 느낀 점을 오픈하기도 했습니다. 또 모두의 생각을 통일시키기 위해 어휘와 핵심 기능을 확실히 동기화하는 작업도 중요하다는 것을 깨닫기도 했습니다.

  팀원들 모두의 장점이 잘 발휘되어서 프로젝트를 무사히 마무리할 수 있었던 것 같습니다. 배울 점이 많은 팀원들을 만나 많이 배웠고 팀플 기간동안 즐거웠습니다.

- ### 김연주

  팀 프로젝트를 처음 진행하면서 0부터 1까지의 선택의 연속이었습니다.
  아이디어 선정부터 개발까지 개개인의 의견과 역량이 다르기에 중심을 잡고 나아간다는 것이 쉽지 않았습니다.

  그럼에도 불구하고 초반에는 의견 조율에서 어려움이 있었지만, 프로젝트가 진행됨에 따라 서로의 성향과 니즈를 이해하고 도와주며,
  수많은 회의를 통해 타협점을 찾아 결론을 내게 되었습니다.
  그리하여 후반부에는 팀워크가 잘 맞아 작업 속도도 향상되었고, 진정한 팀이 되었다고 느낄 수 있었습니다.

  3주간의 시간동안 육각형의 팀원분들과 함께 작업하게 되어 뜻깊었고 협업을 진행하며 의사소통의 중요성을 깨닫고 좋은 경험이 되었다고 생각합니다.
