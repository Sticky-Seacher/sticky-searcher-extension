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
2. [개발 배경](#개발배경)
   - 목적과 문제 해결
3. [시연 영상](#시연-영상)
   - [확장프로그램]
   - [웹사이트]
4. [기술 스택](#기술-스택)
   - [Frontend](#Frontend)
   - [Backend](#Backend)
5. [개발 과정](#개발과정)
   - 텍스트 콘텐츠를 찾고 하이라이팅하는 방법
   - 확장 프로그램에서 현재 페이지 접근하기
   - 올바른 타이밍에 이벤트 발동하기
   - 아이콘, UI 스크래핑 문제 해결
6. [로그인 리다이렉션](#login-redirection)
   - [에러 상황과 해결 방안](#에러-상황과-해결-방안)
7. [웹사이트 드래그 앤 드롭 구현](#웹사이트-드래그-앤-드롭-구현)
   - [마우스 이벤트 처리](#마우스-이벤트-처리)
   - [`useRef()`를 사용한 드래그된 항목 추적](#useref를-사용한-드래그된-항목-추적)
   - [드래그 앤 드롭 문제 해결](#드래그-앤-드롭-문제-해결)
8. [localStorage 값 변할 때 데이터 가져오기](#localstorage-값-변할-때-데이터-가져오기)
   - localStorage 값 변화를 감지하는 방법
9. [팀원 소개](#팀원-소개)
   - 팀원 소개
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

## 멀티 하이라이팅

멀티 하이라이팅 기능은 사용자가 보고 있는 페이지에서 여러 단어들을 각 단어 별로 하이라이팅해 시각적인 분류를 돕는 기능입니다. content script 영역에 접근해서 사용자가 보고 있는 페이지를 수정하고, onCompleted이벤트와 sendMessage를 사용하여 적절한 타이밍에 작업을 시작했습니다. NodeIterator를 사용해 DOM을 탐색하고 원하는 텍스트만 텍스트 노드로 만들어서 요소에 삽입한 후 기존의 텍스트를 제거하는 방식으로 작업을 진행했습니다.

보다 자세한 설명은 다음과 같습니다.

### 사용자가 보고 있는 페이지를 조작할 수 있는 방법 - [content script 사용]

크롬 익스텐션의 여러 영역들 중에 사용자가 보고 있는 페이지에서 작업할 수 있는 영역은 content script 영역으로, 웹 페이지안에서 JavaScript가 실행되도록 합니다. 실행할 파일을 manifest 파일에서 연결해 해당 영역에 접근했습니다

<img width="450" alt="영역 설명" src="https://github.com/user-attachments/assets/9a33c3ed-2f92-4623-9890-bc60e9599b66" />

content script 영역은 웹 페이지의 DOM을 보고 수정할 수 있으며 다른 영역으로 정보를 전달할 수 있습니다. 다른 영역으로는 브라우저 배경에서 실행되는 service worker 영역, 본 프로젝트 UI를 표현하는 side panel 영역이 있습니다.

manifest 파일은 크롬 익스텐션 프로그램 개발 시 필수 파일입니다. 브라우저 권한 요청과 각 영역에서 사용할 파일을 연결하는 역할을 합니다.

크롬 익스텐션에서 작업하는 방법과 각 기능에 대해서는 공식문서와 예제 프로젝트들이 모여 있는 깃허브 레포를 참고했습니다. 추가적으로 레포를 통해서도 확인이 안되는 사항에 대해서는 MDN에서도 확장프로그램 레포를 발견할 수 있었습니다. 실제 실행하고 코드를 수정하고 확인하면서 빠르게 크롬 익스텐션 구조를 파악할 수 있었습니다.

### 대상 텍스트 찾기

#### 타이밍 - [onCompleted이벤트와 sendMessage 사용]

본론부터 밝히자면 사용자가 보고 있는 페이지의 DOM 형성이 완료되었을 때를 onCompleted를 사용해서 감지하여 DOM 탐색을 시작했습니다. 그리고 그 타이밍을 sendMessage와 onMessage를 사용해 관리했습니다.

DOM 형성이 완료된 순간을 감지한 이유는 SPA인 페이지에 대응하기 위함이었습니다. 이는 service worker 영역에서 감지할 수 있는데, 해당 영역에서 onCompleted 이벤트를 사용할 수 있습니다. service worker 영역은 브라우저의 배경에서 실행되는데, 탭을 닫거나 네비게이션에 접근 하는 등의 기능을 할 수 있습니다.

onCompleted 이벤트는 chrome의 webnavigation의 메서드로 제공되며 이벤트 핸들러를 등록할 수 있습니다. 참조되는 모든 리소스를 포함해서 전체 페이지로드가 완료되면 실행됩니다.

sendMessage를 사용한 이유는 다음과 같습니다. DOM 형성이 감지된 순간 다음 작업을 처리할 수 있는 영역은 content script입니다. DOM 탐색이 가능한 영역이 바로 content script이기 때문입니다. 따라서 service worker 영역에서 content script 영역으로 메시지를 보내야 합니다. 때문에 chrome의 tabs의 메서드로 제공되는 sendMessage를 사용했습니다.

onMessage를 사용한 이유는 다음과 같습니다. content script 입장에서는 메시지가 도달한 순간을 감지하는 onMessage 이벤트를 걸고 메시지들을 분간하는 과정이 필요합니다. onMessage 이벤트는 chrome의 runtime의 메서드로 제공되며 이벤트 핸들러를 등록할 수 있습니다. sendMessage가 다른 영역에서 실행되어서 메시지를 전송받았을 때 실행 됩니다.

#### DOM 탐색 - [NodeIterator]

DOM 형성이 완료된 순간을 감지해서 DOM 탐색을 시작할 타이밍을 인지하게 되었습니다. DOM 탐색 방법으로 NodeIterator를 사용했습니다. document.createNodeIterator 함수를 사용하여 NodeIterator를 만든 다음 for 문 등을 이용해서 한 순회마다 다음 노드를 방문하면서 탐색했습니다. 그리고 순회 결과로 대상 텍스트가 포함된 리프 요소를 찾았습니다.

NodeIterator의 특징은 다음과 같습니다. 모든 종류의 모든 노드를 탐색할 수 있으며 필터링한 종류, 예를 들어 텍스트 노드에만 방문할 수도 있습니다. 다음 노드가 페이지 위에서 아래의 사용자 시각의 흐름이기 때문에 이해하기도 쉬웠습니다.

NodeIterator를 사용하게된 이유는 텍스트 노드인 콘텐츠를 찾을 수 있고, 해당 요소의 위치도 사용할 수 있었기 때문입니다. 예를 들어서 document.querySelector는 콘텐츠를 찾을 수는 없고 이미 알고 있는 특정 요소를 찾는 메서드이기에 사용하기 어렵습니다. 또 이진 트리 알고리즘은 노드의 자식 갯수가 2개로 한정되어 있기에 사용하기 어렵습니다. 전체 페이지의 테그들을 문자열로 받아서 텍스트를 발견하는 것도 추후 하이라이팅 작업 시 DOM에서의 위치를 알고 있어야 하기 때문에 사용하기 어려웠습니다.

NodeIterator는 루트 노드를 제공할 수 있고, 탐색 할 노드의 타입을 명시할 수 있고, 탐색을 이어갈 지 멈출지도 결정할 수 있습니다. 본 프로젝트에서는 루트 노트로 body 테그를 제공하고 텍스트 노드에만 방문하도록 필터링 했습니다. 유사하게 TreeWalker도 존재하는데, 저희 프로젝트에서는 다음 노드로만 가면 되었기에 복잡성을 줄이고자 NodeIterator를 사용했습니다.

### 텍스트를 요소로 만들기 - [태그 문법]

DOM 탐색 결과 얻게 된 리프 요소를 대상으로 다시 한 번 NodeIterator를 사용해 순회해야 합니다. 원하는 단어를 기준으로 split 한 후, 원하는 단어는 배경색이 지정된 요소화 해서 삽입하고 그 이외의 텍스트들은 텍스트 노드화 해서 삽입했습니다. 그 이후 기존 텍스트 콘텐츠 전문은 삭제 처리했습니다.

리프 노드로 범위를 좁힌 다음에 다시 NodeIteragtor를 사용한 이유는 다음과 같은 DOM 구조에 대응하기 위함입니다. 상황 예시로 class라는 단어를 하이라이팅하고 싶은 상황을 가정하겠습니다.

```html
<span>
  class는 교육기관에서 사용하는 단위 입니다.
  <div class="class">class</div>
  반 또는 학급이라는 단위로 대체될 수도 있습니다.
  <textarea
    id="class"
    name="class"
    rows="5"
    cols="33"
  >
    class의 다른 의미를 찾아 제출하십시오.
  </textarea>
</span>
```

위의 span에 innerHTML을 사용한 다음에 class단어만 replace처리한다면 속성이 요소로 감싸지는 등 문법 위반 사례가 발생하기 쉬웠습니다. 그리고 textarea 요소와 같이 내부 콘텐츠에 다른 요소를 삽입할 수 없는 요소의 존재를 대응하기 어려워졌습니다.

그러므로 NodeIterator로 위의 span을 순회하면서 tagName이 input이나 textarea일 경우는 탐색에서 제외했습니다. 순수하게 텍스트 노드로 존재하는 class라는 단어만 요소로 만들었습니다.

이 과정에서 jsbin과 debugger의 효과를 채감할 수 있었습니다. jsbin으로 작은 단위의 DOM에서 우선 작은 기능 구현을 도전했습니다. 주로 단어가 전체 콘텐츠의 맨 앞에 있거나 맨 뒤에 있을 경우 등의 엣지케이스를 확인하는 데 좋았습니다. 그리고 MDN 사이트 등 본격적인 사이트에서 콘솔 탭을 열어 해당 함수를 적용시켜 보았고, debugger를 쓰면서 점진적으로 하나씩 하이라이트가 찍히는 모습과 해당하는 코드 로직을 따라가며 버그를 잡아 내니 문제 해결에 걸리는 시간을 단축할 수 있었습니다.

## 페이지 간 description 자동 스크롤

페이지 간 description 자동 스크롤 기능은 구글 검색 페이지에서 링크당 단락을 표시해 줄 경우, 해당 링크를 누르면 해당 단락이 위치한 곳으로 자동으로 스크롤을 내려주는 기능입니다. 구글 검색페이지에 위치했을 때 chrome storage에 단락들을 미리 저장해 놓은 후, 페이지 이동 시 text fragments로 만들어 URL 끝에 추가해 리다이렉션을 시키는 방식으로 작업을 진행했습니다.

description은 다음 영역의 텍스트를 가리키는 용어로 팀 내에서 공통된 단어로 소통하기 위해 명명해서 사용하고 있습니다.

<img width="450" alt="description" src="https://github.com/user-attachments/assets/fa1b782f-031f-4b53-ad7a-ca4ec15abe9b" />

보다 자세한 설명은 다음과 같습니다.

### description 취득과 chrome storage

현재 URL이 구글 검색 페이지 일 경우, 구글 검색 결과 리스트 중 desciption 부분들만 정제하고 chrome storage에 저장했습니다. 그리고 구글 검색 페이지 탭을 닫을 경우 저장한 description을 삭제하도록 했습니다.

현재 URL이 구글 검색 페이지인 지 확인하는 과정은 크롬 익스텐션의 여러 영역들 중 service workers 영역에서 가능합니다. 네비게이션에 접근해야 하기 때문입니다. 반면에 구글 검색 결과 리스트 중 desciption 부분들만 정제하는 과정은 content script 영역에서 가능합니다. 웹 페이지의 DOM에 접근해야 하기 때문입니다. 이에 sendMessage와 onMessage를 사용해서 영역간 통신을 했습니다.

description 부분만 정제할 때는 날짜나 이미지 등의 불필요한 사항은 제거하고 한 문장만 취득했습니다. 그리고 더불어 해당 description이 속한 링크의 주소도 함께 취득했습니다. 하나의 탭을 기준으로 주소를 키로하고 description을 값으로 하는 구조체를 만들어서 chrome storage에 저장했습니다.

chrome storage 크롬 익스텐션의 모든 영역에서 접근 가능한 클라이언트 측 저장공간입니다. 링크와 description들은 사용자가 해당 링크를 클릭하지 않을 수도 있어 쓰지 않을 수도 있는 임시 데이터이기 때문에 클라이언트 측에 저장하기로 했습니다. 이때 local storage 등의 기존 Web Storage API는 service workers 영역에서 접근 할 수 없기 때문에 chrome storage를 사용했습니다.

chrome storage 저장 용량은 기본 10MB입니다. 이는 unlimitedStorage 권한을 요청하여 늘릴 수 있으나, 용량을 효율적으로 사용하기 위해 구글 검색 페이지 탭을 닫을 경우 삭제하도록 했습니다. chrome의 tabs의 onRemoved 이벤트를 사용해서 특정 고유한 id의 탭이 삭제되었을 경우를 알아차릴 수 있었습니다.

### 리다이렉션과 text fragment, declarativeNetRequest

페이지를 이동하고 동시에 자동으로 스크롤을 시키기 위해, 규칙으로 선언해놓은 URL로 이동할려고 할 경우 text fragment가 적용된 URL로 리다이렉션 시켰습니다. 이를 위해 declarativeNetRequest를 사용해 리다이렉션 규칙들을 만들고 chrome storage와 동기화 시켰습니다.

text fragment는 웹 페이지의 특정 부분을 링크로 공유할 수 있도록 해줍니다. URL 끝에 `#:~:text=` 라는 접두사를 넣어 추가할 수 있습니다. 그 결과 접두사 뒤의 글자들이 있는 위치로 웹 페이치를 스크롤 시킬 수 있습니다. 다만 URL의 일부분인 만큼 encodeURIComponent를 사용하여 인코딩하는 과정을 거치는 것이 안전했습니다.

declarativeNetRequest는 네트워크 요청을 수정하거나 차단할 수 있는 chrome API 입니다. 구글 검색 페이지에서 description을 취득할 때 함께 취득한 링크들에 대해서 리다이렉션 규칙들을 지정했습니다. 해당 URL과 동일한 네트워크 요청을 보낼 경우 text fragment가 추가된 URL로 요청이 리다이렉션 됩니다.

chrome stroage에 onChange 이벤트를 걸어 놓아 리다이렉트 규칙들을 동기화시켰습니다. chrome storage에 새로운 description과 링크들이 저장되면 리다이렉트 규칙들도 업데이트가 되며, chrome storage가 비워지면 리다이렉트 규칙도 비워집니다. 이는 chrome storage를 진실의 원천으로 삼아 관련된 로직들이 chrome storage에 반응하여 작동하도록 하기 위함이었습니다.

## 로그인 리다이렉션 오류 해결 - [인증 토큰(accessToken) 기준 조건문]

### **인증 토큰(accessToken)이란?**

- "로그인 인증을 위한 증명서" 같은 개념입니다.<br>
  우리가 로그인을 할 때 사용하는 비밀번호처럼 사용자가 제대로 로그인했는지 시스템이 확인할 수 있습니다.

### 해당 상황에서 어떤 문제들이 있을 수 있었는지?

- 로그인을 성공하더라도 사용자의 이메일이나 인증 토큰이 제대로 설정되지 않으면, <br> 상태를 유지하지 못하고 다시 로그인 페이지로 돌아가는 상황입니다.

### **해결방안**

- 사용자의 이메일 값을 가져와 조건을 주는 시도를 하려다 이메일 정보만 알면 제 3자가 로그인을 할 수 있는 보안의 이슈가 있어 고유한 값인 인증 토큰을 갖고와서 조건을 걸어주었습니다.

### **해결 전 코드**

```jsx
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

```jsx
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

## 검색 리스트 드래그앤드롭 기능 구현 순서 - [draagable 속성 + useRef]

### **마우스 이벤트 처리**

- `mousedown` (마우스 버튼 누름): 사용자가 요소를 드래그하거나 놓을 때 발생하는 여러 이벤트를 처리합니다.
- `mousemove` (마우스 이동): 요소로 드래그하는 동안 추적합니다.
- `mosueup` (마우스 버튼 떼기): 마우스를 놓을 때 발생하며, 드래그가 끝나는 시점을 추적합니다.

### **마우스 이벤트 속성 `draagable`**

- draagable는 `true`인 값은 대표적으로 `<a>` 태그가 있고 반면에 `<span>`태그는 불가합니다.

### `dragenter` / `dragstart` / `dragleave` 속성이란?

- `dragenter` 이벤트를 적용한 요소에 드래그한 아이템이 닿을 경우 콜백함수가 실행됩니다.
- `dragstart` 이벤트를 적용한 요소에 드래그한 아이템이 위치하면 계속해서 콜백함수가 실행됩니다.
- `dragleave` 이벤트는 드래그 중인 요소가 자신을 감싸고 있던 영역을 벗어 났을 때 콜백함수가 실행된다. `e.preventDefault()`를 사용하게 된다면 이벤트 동작이 겹치는 것을 방지합니다.
- `dragend` 이벤트는 드래그를 끝낼 시에 콜백 함수가 실행됩니다.

### `useRef()` **드래그되는 항목 추적**

- `useRef()` 는 변수명에 초기값을 적는 식으로 만들어 결과값을 `{ current: 초기값 }` 을 지닌 객체가 반환됩니다.
- `dragstart` 는 콜백함수의 매개변수로 그룹인덱스와 와 키워드의 `초기값` 을 받고있습니다.
- 드랍은 `event`, `groupIndex` 를 매개변수로 받고있고 `newList`라는 변수명에 기존에 있던 list들의 배열을 불러오고있습니다.
- `newList` 드래그된 그룹의 인덱스들의 키워드들을 배열안에서 필터링하여<br> 키워드랑 일치한지 아닌지 구분하여 새로운 배열을 반환합니다.

- `dragPosition.current`: 드래그가 시작된 위치 <br>(즉, 키워드의 그룹 인덱스와 키워드)를 저장합니다.

  ```jsx
  const startDrag = (historyGroupIndex, history) => {
    dragPosition.current = {
      historyGroupIndex: historyGroupIndex,
      history: history,
    };
  };
  ```

### 해당 상황에서 어떤 문제들이 있을 수 있었는지?

- 2개의 그룹이 있다면 영역내에 드래그한 요소를 다른 박스로 옮길 때 삭제되거나 중복되어 추가되는 상황이 있었습니다.
  <img alt="Image" src="https://github.com/user-attachments/assets/fbb35a40-63e4-436d-9172-14e773ee40b1" />

### **해결 방안**

- 기존 그룹내에 리스트 요소들이 있다면 `index`가 중요하고<br>
  각 해당되는 리스트들의 고유한 `key`값을 주었더니 해결되었습니다.

  ```
     {historyGroups.map((historyGroup, historyGroupIndex) => (
        <KeywordGroup
          key={historyGroup.id}
          onDragStart={(history) => startDrag(historyGroupIndex, history)}
          //...
        />
      ))}
  ```

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
