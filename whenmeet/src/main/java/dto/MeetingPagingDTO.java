package dto;

public class MeetingPagingDTO {
	String category, sort_type;
	int start, end;
	
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getSort_type() {
		return sort_type;
	}
	public void setSort_type(String sort_type) {
		this.sort_type = sort_type;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getEnd() {
		return end;
	}
	public void setEnd(int end) {
		this.end = end;
	}
	
	
}