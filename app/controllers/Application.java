package controllers;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

import models.Category;
import models.Comment;
import models.Resource;
import play.cache.Cache;
import play.data.validation.Required;
import play.libs.Codec;
import play.libs.Images;
import play.mvc.Controller;

public class Application extends Controller {

	public static void index() {
        List<Category> categories = Category.find("order by parent_id_").fetch();
        render(categories);
    }
	
    public static void findByCateg(Long categoryId) {
        List<Resource> resources = Resource.findAll();
        List<Resource> myResources = new ArrayList<Resource>(); 
        for(Resource resource:resources){
        	for(Category category:resource.categories){
        		if(category.id == categoryId){
        			myResources.add(resource);
        			System.out.println(resource);
        			break;
        		}
        	}
        }

        List<Category> categories = Category.find("order by id_").fetch();

        render(categories, myResources);
    }
    
    public static void showResource(Long resourceId, boolean view) {
    	Resource resource = Resource.find("id="+resourceId).first();
    	if(view){
    		if(resource.viewed == null) resource.viewed = 0L;
	    	resource.viewed ++;
	    	resource.save();
    	}
        String randomID = Codec.UUID();
        render(resource, randomID);
    }

    public static void resourceComment(
            Long resourceId, 
            @Required(message="Author is required") String author, 
            @Required(message="A message is required") String content, 
            @Required(message="Please type the code") String code, 
            String randomID) 
    {
        Resource resource = Resource.findById(resourceId);
        validation.equals(
            code, Cache.get(randomID)
        ).message("Invalid code. Please type it again");
        if(validation.hasErrors()) {
            render("Application/showResource.html", resource, randomID);
        }
        resource.addComment(author, content);
        flash.success("Thanks for posting %s", author);
        Cache.delete(randomID);
        showResource(resourceId, false);
    }
    
    public static void removeResComment(Long resourceId, Long commentId){
    	Comment.delete("id", commentId);
    	showResource(resourceId, false);
    }
    
    public static void captcha(String id) {
        Images.Captcha captcha = Images.captcha();
        String code = captcha.getText("#123456");
        Cache.set(id, code, "10mn");
        renderBinary(captcha);
    }
    
    public static void searchByName(String searchKeyword){
    	String key_ = "%" + searchKeyword + "%";
        List<Resource> myResources = Resource.find("title_ like ? or keywords_ like ?", key_, key_).fetch();
        System.out.println(key_ + "SEARCHING..." + myResources.toString());
        List<Category> categories = Category.find("order by id_").fetch();

        render(categories, myResources);
    }

    public static void updateRating(Long resId, Double r){
    	Resource resource = Resource.findById(resId);
    	if(resource.rateCount == null) resource.rateCount = 0L;
    	if(resource.rating == null) resource.rating = 0.0;
    	resource.rating = (resource.rating*resource.rateCount+r)/(resource.rateCount+1);
    	DecimalFormat df = new DecimalFormat("#.##");      
    	resource.rating = Double.valueOf(df.format(resource.rating));
    	resource.rateCount++;
    	resource.save();
    	renderJSON(resource.rating);
    }
    
    public static void playScorm(Long resId){
    	Resource resource = Resource.findById(resId);
    	render(resource);
    }
}