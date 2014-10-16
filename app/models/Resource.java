package models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import play.data.validation.MaxSize;
import play.data.validation.Required;
import play.db.jpa.GenericModel;

@Entity
@Table(name="NS_RESOURCE")
public class Resource extends GenericModel {
	
	@Required
	@Id
	@Column(name="ID_")
	public long id;

	@Required
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name="NS_RESOURCE_CATEGORY")
	public List<Category> categories = new ArrayList<Category>();
	
	@Required
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name="NS_RESOURCE_LANGUAGE")
	public List<Language> languages = new ArrayList<Language>();
	
	@Required
	@Column(name="TITLE_")
	public String title;
	
	@Column(name="CONTENT_")
	public String content;

	@Column(name="DATE_")
	public Date uploadDate;
	
	@Column(name="KEYWORDS_")
	public String keywords;
	
	@Required
	@Column(name="AUTHOR_")
	public String author;
	
	@MaxSize(10000)
	@Column(name="DESCRIPTION_")
	public String description;
	
	@Column(name="RESOURCE_SIZE_")
	public Long resourceSize;
	
	@Required
	@Column(name="CONTENT_TYPE_")
	public String contentType;
	
	@Required
	@Column(name="FILE_NAME_")
	public String fileName;
	
	@Column(name="VIEWED_")
	public Long viewed;
	
	@Column(name="RATING_")
	public Double rating;
	
	@Column(name="RATE_COUNT_")
	public Long rateCount;
	
	@OneToMany(mappedBy="resource", cascade=CascadeType.ALL)
	public List<Comment> comments;
	 
	public Resource(String author, String title) { 
	    this.comments = new ArrayList<Comment>();
	    this.categories = new ArrayList<Category>();
	    this.languages = new ArrayList<Language>();
	    this.author = author;
	    this.title = title;
	    this.uploadDate = new Date();
	    this.viewed = 0L;
	}
	
	public Resource addComment(String author, String content) {
	    Comment newComment = new Comment(this, author, content).save();
	    this.comments.add(newComment);
	    this.save();
	    return this;
	}
	
	public String toString() {
	    return id + " - " + title;
	}
}
