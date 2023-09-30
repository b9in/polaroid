# POLAROID
Vanilla JS 이미지 공유 웹 사이트
## 프로젝트 소개
프로젝트 참여 인원 : 1명

이 프로젝트는 설명과 함께 이미지를 공유할 수 있는 소셜 미디어 웹 사이트입니다. UI를 디자인하여 ejs를 이용해 템플릿을 표시 하고 Vanilla JS로 프론트 엔드를 개발하였습니다.
또, Node.js Express를 사용하여 백엔드를 처음으로 직접 구현해 백엔드 지식을 키울 수 있었습니다. 

- **FRONT-END** : HTML, CSS, Vanilla JS, EJS
- **BACK-END** : Node JS, Express
- **DB** : MySQL

## 주요 기능

#### 메인 화면 - 로그아웃 상태
![main](https://github.com/b9in/polaroid/assets/128045612/587a1a8d-94d4-4e65-be5e-eb9e153bb475)

메인 화면은 상단 메뉴와 검색 기능이 있는 header, video를 표시하는 figure, 트렌딩 기능을 담는 section, footer로 구성되어 있습니다.

상단 메뉴를 통해 Login과 Sign up을 할 수 있고 트렌딩 기능이 표시됩니다.

```css
figure {
  ...
  height: calc(100vh - 120px);
  ...
}
```
calc(100vh - header의 height값)을 하여 웹 사이트를 방문했을 때 화면에 video가 꽉 차도록 표시했습니다.

#### 로그인 화면
![login](https://github.com/b9in/polaroid/assets/128045612/bfeaf6a6-fa21-45f8-be30-ecdd2a9d7784)

사용자가 아이디와 비밀번호를 입력하면 DB와 일치하는 아이디와 비밀번호를 찾아 로그인합니다.

Cookie를 사용한 Remember me 기능을 구현하여 사용자가 Remeber me 체크박스를 누르면 웹 사이트는 사용자의 id를 기억합니다.

#### 회원가입 화면
![signup](https://github.com/b9in/polaroid/assets/128045612/4df027ae-3659-4aa3-acf1-eb6e48e8cb10)

사용자는 아이디와 비밀번호를 생성하여 회원 가입을 할 수 있습니다.

비밀번호 오입력을 대비하여 비밀번호 확인을 다시 입력해야 합니다.

#### 메인 화면 - 로그인 상태
![main2](https://github.com/b9in/polaroid/assets/128045612/646c3b1b-1099-4ca5-a84e-05c4d903bef8)

사용자가 웹 사이트 로그인 시 나와 다른 사람의 이미지 게시물을 볼 수 있습니다.

MY 버튼을 통해 내가 올린 게시물만 볼 수 있고 하트 버튼을 통해 내가 좋아요 누른 게시물만 확인할 수 있습니다.

상단의 검색 기능을 통해 특정 키워드가 포함된 제목이 있는 게시물만 볼 수 있습니다.

게시물은 최신 등록순으로 표시되며 제목과 내용이 표시됩니다. 사용자는 한 게시물당 한 번씩만 좋아요를 누를 수 있습니다.

![main2_page](https://github.com/b9in/polaroid/assets/128045612/f203192b-f6c5-4726-b8e0-76afcfc2b37f)

화살표 버튼을 눌러 페이지를 넘기면 다음 페이지가 표시됩니다.

#### 게시물 업로드
![upload1](https://github.com/b9in/polaroid/assets/128045612/8154cdaa-29d5-4a4b-990b-887cbf0599ea)

게시물을 업로드할 때 사진을 필수로 업로드해야하기 때문에 사진을 업로드하면 입력 창이 뜨도록 하였습니다.

![upload2](https://github.com/b9in/polaroid/assets/128045612/a061155e-e29d-42bd-9ee2-080afc97a4c1)

업로드 할 사진을 선택하면 게시물의 제목, 내용을 입력할 수 있습니다.

내용은 입력하지 않아도 되지만 제목을 입력하지 않을 시 업로드 버튼이 비활성화 됩니다.

#### 메인 화면 - 좋아요
![main2_like](https://github.com/b9in/polaroid/assets/128045612/ba78d04c-e33b-4201-b1bd-c3255f2bfe54)

하트 버튼을 누르면 사용자가 좋아요 누른 게시물만 볼 수 있습니다.

'test01' 계정으로 로그인을 하여 'test01' 사용자가 좋아요를 누른 게시물만 표시됩니다.

#### 메인 화면 - MY
![main2_my](https://github.com/b9in/polaroid/assets/128045612/3ba2ca42-f574-4f95-b0f7-6381ba1b3d9c)

MY 버튼을 누르면 사용자가 업로드한 게시물만 볼 수 있습니다.

'test02' 계정으로 로그인을 하여 'test02' 사용자가 업로드한 게시물만 표시됩니다.

#### 메인 화면 - 검색 기능
![main2_search](https://github.com/b9in/polaroid/assets/128045612/1e2cd598-5e42-4865-b919-f4e01801bbae)

상단의 검색 창을 통해 키워드를 입력하면 키워드가 포함된 제목의 게시물을 나타냅니다.

'll'이라는 키워드로 검색 시, 'll'이 포함된 'Full moon', 'Willow warbler', 'Wall Graffiti'가 나타나게 됩니다.

#### 팝업 창
<img width="1280" alt="popup" src="https://github.com/b9in/polaroid/assets/128045612/cd567791-7eb5-4ef0-9d03-6f8d11c2ac15">

메인 화면의 게시물을 클릭하면 게시물이 팝업 창으로 뜨게 됩니다. 

게시물의 title, content, writer, date가 표시되고 update, delete 버튼을 통해 게시물 수정과 삭제를 할 수 있습니다.

게시물의 wrtier와 세션 아이디가 다르면 update와 delete는 적용되지 않습니다.

#### 게시물 수정
![update](https://github.com/b9in/polaroid/assets/128045612/b19d9a7c-9265-42fb-b643-e741f4720bab)

팝업 창의 update 버튼을 누르면 게시물 수정이 가능해집니다.

#### MY PAGE

MY PAGE에서는 회원 정보 수정과 회원 탈퇴 기능이 있습니다.

![mypage1](https://github.com/b9in/polaroid/assets/128045612/f83b0e29-5b2e-4c59-88c4-ad9b50328794)

회원 정보 수정 페이지에서는 회원의 비밀번호를 수정할 수 있습니다.

![mypage2](https://github.com/b9in/polaroid/assets/128045612/98111d2c-e20b-44ba-b11d-75fb6ab4c64f)

회원 탈퇴 페이지에서는 사용자의 회원 탈퇴 기능을 제공합니다.

사용자 회원 탈퇴 시 사용자의 업로드한 게시물은 모두 삭제됩니다.

## 느낀 점

처음으로 혼자서 프론트엔드와 백엔드를 모두 구현하여 웹 개발의 전반적인 프로세스를 이해할 수 있었다. 프론트엔드 개발 시 생각보다 사용자 관점으로서 불편한 점이 많아 신경써야 할 부분이 많았다. 기능들을 추가할 때 코드를 수정하는 부분에 있어 코드가 점점 많아지면서 컴포넌트 설계가 중요하다는 것을 느꼈다. 백엔드 개발을 하면서 가장 까다로웠던 부분은 좋아요/검색/MY 기능의 페이징 처리였다. 각각 페이징 기능 사이의 데이터를 주고 받는 부분에서 복잡함을 느껴 데이터 흐름 관리가 중요하다는 것을 깨달았다. 

