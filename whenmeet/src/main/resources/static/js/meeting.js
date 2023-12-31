// 로그인 함수
function tryLogin() {
	alert("로그인이 필요합니다.");
};

// 게시글 목록 제목 함수
function setConTableTh() {
	return `<tr>
				<th>번호</th>
				<th colspan='2'>제목</th>
				<th>작성자</th>
				<th>작성일</th>
				<th>신청자수</th>
				<th>조회</th>
			</tr>`;
};

// category active 함수
function categoryActive(category) {
	let category_li = document.querySelector(`.category_li[data-target='${ category }']`);
	category_li.classList.add("category_active");
	category_li.querySelector("a").classList.add("category_active");
}
function categoryReActive(category) {
	document.querySelector(`.category_re[data-target=${ category }]`).classList.add("category_re_active");
}

// page active 함수
function pageActive(sort, page) {
	// 기존 active class 제거
	document.querySelectorAll(".sort_a, .page_a").forEach(function(a) {
		a.classList.remove("page_active");
	});
	
	// active class 생성
	document.querySelector(`.sort_a[data-target=${ sort }]`).classList.add("page_active");
	document.querySelectorAll(".page_a").forEach(function(a) {
		if (a.textContent.includes(page)) {
			a.classList.add("page_active");
		}
	});
};

// page 생성 함수
function makePage(totalCnt, divNum) {
	let result = "";
	let totalPage = Math.floor(totalCnt / divNum);
	
	if (totalCnt % divNum != 0) {
		totalPage++;
	}
	
	let lastPage = totalPage;
	let temp = "";
	
	if (totalPage > 5) {
		lastPage = 5;
		
		for(let p = 1; p <= lastPage; p++) {
			temp = `&nbsp;<a class="page_a" href="" data-target="${ p }">${ p }</a>&nbsp;`;
			result += temp;
		}
		
		temp = `&nbsp;<a class="page_change" href="" data-target="5" data-total="${ totalCnt }" data-div="${ divNum }" onclick="changePage(event)">&gt;</a>&nbsp;`;
		result += temp;	
	}
	else {
		for(let p = 1; p <= lastPage; p++) {
			temp = `&nbsp;<a class="page_a" href="" data-target="${ p }">${ p }</a>&nbsp;`;
			result += temp;
		}
	}
		
	return result;
}

function changePage(event) {
	// 기본 이벤트 제거
	event.preventDefault();
	
	// 데이터
	const target = parseInt(event.target.getAttribute("data-target"));
    const totalCnt = parseInt(event.target.getAttribute("data-total"));
    const divNum = parseInt(event.target.getAttribute("data-div"));
    
    // 페이지 계산
	let result = "";
	let totalPage = Math.floor(totalCnt / divNum);
	
	if (totalCnt % divNum != 0) {
		totalPage++;
	}
	
	let lastPage = totalPage;
	let nextPage = target + 5;
	let prevPage = target - 5;
	let temp = "";
	
	// nextPage 클릭 시
	if (target % 5 == 0) {
		if (totalPage > nextPage) {
			lastPage = nextPage;
			
			temp = `&nbsp;<a class="page_change" href="" data-target="${ target + 1 }" data-total="${ totalCnt }" data-div="${ divNum }" onclick="changePage(event)">&lt;</a>&nbsp;`;
			result += temp;
			
			for(let p = target + 1; p <= lastPage; p++) {
				temp = `&nbsp;<a class="page_a" href="" data-target="${ p }">${ p }</a>&nbsp;`;
				result += temp;
			}	// for end
			
			temp = `&nbsp;<a class="page_change" href="" data-target="${ nextPage }" data-total="${ totalCnt }" data-div="${ divNum }" onclick="changePage(event)">&gt;</a>&nbsp;`;
			result += temp;	
		}	// if end
		else {
			temp = `&nbsp;<a class="page_change" href="" data-target="${ target + 1 }" data-total="${ totalCnt }" data-div="${ divNum }" onclick="changePage(event)">&lt;</a>&nbsp;`;
			result += temp;
			
			for(let p = target + 1; p <= lastPage; p++) {
				temp = `&nbsp;<a class="page_a" href="" data-target="${ p }">${ p }</a>&nbsp;`;
				result += temp;
			}	// for end
		}	// else end
	}	// nextPage 클릭 시 if end
	// prevPage 클릭 시
	else {
		if (target == 6) {
			lastPage = 5;
			
			for(let p = 1; p <= lastPage; p++) {
				temp = `&nbsp;<a class="page_a" href="" data-target="${ p }">${ p }</a>&nbsp;`;
				result += temp;
			}	// for end
			
			temp = `&nbsp;<a class="page_change" href="" data-target="${ lastPage }" data-total="${ totalCnt }" data-div="${ divNum }" onclick="changePage(event)">&gt;</a>&nbsp;`;
			result += temp;
		}	// if end
		else {
			lastPage = target - 1;
			
			temp = `&nbsp;<a class="page_change" href="" data-target="${ prevPage }" data-total="${ totalCnt }" data-div="${ divNum }" onclick="changePage(event)">&lt;</a>&nbsp;`;
			result += temp;
			
			for(let p = prevPage; p <= lastPage; p++) {
				temp = `&nbsp;<a class="page_a" href="" data-target="${ p }">${ p }</a>&nbsp;`;
				result += temp;
			}	// for end
			
			temp = `&nbsp;<a class="page_change" href="" data-target="${ lastPage }" data-total="${ totalCnt }" data-div="${ divNum }" onclick="changePage(event)">&gt;</a>&nbsp;`;
			result += temp;
		}	// else end
	}	// prevPage 클릭 시 else end
	
	event.target.closest("div").innerHTML = result;
}

// 게시글 생성자
function MeetingCon(seq, category, title, writer, writing_time, applicant_cnt, hits, contents) {
	this.seq = seq;
	this.category = category;
	this.title = title;
	this.writer = writer;
	this.writing_time = writing_time;
	this.applicant_cnt = applicant_cnt;
	this.hits = hits;
	this.contents = contents;
	this.printTd = function() {
		return `<tr>
					<td>${ this.seq }</td>
					<td>${ this.category }</td>
					<td><a href='/meeting/detailed?seq=${ this.seq }'>${ this.title }</a></td>
					<td>${ this.writer }</td>
					<td>${ this.writing_time }</td>
					<td>${ this.applicant_cnt }</td>
					<td>${ this.hits }</td>
				</tr>`;
	};
	this.printSearch = function() {
		return `<tr>
					<td rowspan="2" class="td_seq">${ this.seq }</td>
					<td rowspan="2" class="td_category">${ this.category }</td>
					<td class="td_title"><a href="/meeting/detailed?seq=${ this.seq }">${ this.title }</a></td>
					<td class="td_writer">${ this.writer }</td>
					<td class="td_writing_time">${ this.writing_time }</td>
					<td class="td_applicant_cnt">${ this.applicant_cnt }</td>
					<td class="td_hits">${ this.hits }</td>
				</tr>
				<tr>
					<td colspan="4" class="td_contents">${ this.contents }</td>
				</tr>`;
	};
};

// 댓글 생성자
function MeetingApp(profile_url, name, applicant_time, approval, contents, user_id) {
	this.profile_url = profile_url;
	this.name = name;
	this.applicant_time = applicant_time;
	this.approval = approval;
	this.contents = contents;
	this.user_id = user_id;
	this.printLi = function() {
		return `<li>
					<div class="app_list_caption">
						<div class="app_list_profile">
							<img alt="app_list_profile" src="${ this.profile_url }">
						</div>
						<div class="app_list_info">
							<label class="app_list_name">${ this.name }</label>
							<label class="app_list_time">${ this.applicant_time }</label>
						</div>
						<label class="app_list_approval">${ this.approval }</label>
					</div>
					<div class="app_list_contents">
						<p>${ this.contents }</p>
					</div>
				</li>`;
	};
	this.printLiMy = function() {
		return `<li id="my_app">
					<div class="app_list_caption">
						<div class="app_list_profile">
							<img alt="app_list_profile" src="${ this.profile_url }">
						</div>
						<div class="app_list_info">
							<label class="app_list_name">${ this.name }</label>
							<label class="app_list_time">${ this.applicant_time }</label>
						</div>
						<label class="app_list_approval">${ this.approval }</label>
					</div>
					<div class="app_list_contents">
						<p>${ this.contents }</p>
					</div>
					<div class="app_list_btn">
						<input id="app_list_change" type="button" value="수정">
						<input id="app_list_cancel" type="button" value="삭제">
					</div>
				</li>`;
	};
	this.printLiWt = function() {
		return `<li>
					<div class="man_chk_list">
						<input id="ch_${ this.user_id }" class="man_checkboxs" type="checkbox" name="user_id" value="${ this.user_id }">
						<label for="ch_${ this.user_id }"></label>
					</div>
					<div class="man_list_caption">
						<div class="man_list_profile">
							<img alt="man_list_profile" src="${ this.profile_url }">
						</div>
						<div class="man_list_info">
							<label class="man_list_name">${ this.name }</label>
							<label class="man_list_time">${ this.applicant_time }</label>
						</div>
						<label class="man_list_approval">${ this.approval }</label>
					</div>
					<div class="man_list_contents">
						<p>${ this.contents }</p>
					</div>
				</li>`;
	}
};