// 공통 기능
export function RaiseError(err: Error | string) {
	// 1.경고창 출력
	// 2.상태 초기화
	// 3.페이지 리로드
	alert(typeof err === "string" ? err : err.message);
	window.location.reload();
}
