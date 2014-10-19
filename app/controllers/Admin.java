package controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import models.Category;
import models.Language;
import models.Resource;
import play.data.validation.Required;
import play.db.jpa.Blob;
import play.libs.Files;
import play.libs.MimeTypes;
import play.mvc.Controller;


public class Admin extends Controller {
	
    public static void admin(){
		render();
    }
    
    public static void listCategories(){
    	List<Category> categories = Category.findAll();
    	render(categories);
    }
    
    public static void listResources(){
    	List<Resource> resources = Resource.findAll();
    	render(resources);
    }
    
    public static void listLanguages(){
    	List<Language> languages = Language.findAll();
    	render(languages);
    }
    
    public static void addCategory(@Required(message="Id is required") Long id,
    		@Required(message="Name is required") String name,
    		@Required(message="Parent is required") Long parentId,
    		@Required(message="Level is required") Long levelId){
    	
        if(validation.hasErrors()) {
            render("Admin/addCategory.html");
        }
        
        Category categ = Category.findById(id);
        if(categ == null){
        	new Category(id, name, parentId, levelId).save();
        }

    	System.out.println(id + name + parentId + levelId);
    	listCategories();
    }
    
    public static void addResource(@Required(message="title is required") String title,
    		@Required(message="Keyword is required") String keywords,
    		@Required(message="Author is required") String author,
    		@Required(message="Description is required") String description,
    		@Required(message="ContentType is required") String contentType,
    		@Required(message="Category is required") Long categoryId,
    		@Required(message="Language is required") Long languageId,
    		File poster, File cor
    		){
    	
        if(validation.hasErrors()) {
        	List<Category> categories = Category.findAll();
        	List<Language> languages = Language.findAll();
            render("Admin/addResource.html", categories, languages);
        }
        
    	System.out.println(categoryId+title);
    	Resource resource = new Resource(title, keywords, author, description, contentType, categoryId, languageId);
//    	resource.poster = new Blob();
//    	resource.save();
//    	
//    	System.out.println(poster.getName());
//    	
//    	try {
//			resource.poster.set(new FileInputStream(poster), MimeTypes.getContentType(poster.getName()));
//		} catch (FileNotFoundException e) {
//			e.printStackTrace();
//		}
//    	resource.save();
//    	resource.posterName = resource.poster.getFile().getName();
//    	resource.save();
//
//    	System.out.println(resource.poster.getUUID());
//    	System.out.println(resource.poster.getFile().getName());
    	
		String posterMimeType = MimeTypes.getMimeType(poster.getName(), "application/octet-stream");
		String corMimeType = MimeTypes.getMimeType(cor.getName(), "application/octet-stream");
		resource.poster = new Blob();
		resource.cor = new Blob();
		try {
			FileInputStream fis = new FileInputStream(poster);
			resource.poster.set(fis, posterMimeType);
			fis.close();
			FileInputStream cis = new FileInputStream(cor);
			resource.cor.set(cis, corMimeType);
			cis.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		resource.resourceSize = resource.cor.length();
		resource.save();
		
		if(resource.contentType.equals("scorm")){
			resource.corName = cor.getName().substring(0, cor.getName().length()-4);
			File unzippedCOR = new File("public/CORs/" + resource.corName);
			Files.unzip(resource.cor.getFile(), unzippedCOR);
			resource.save();
		}else{
			resource.corName = cor.getName();
			resource.cor.getFile().renameTo(new File("public/CORs/" + resource.corName));
			resource.save();
		}
		resource.posterName = poster.getName();
		resource.save();
		resource.poster.getFile().renameTo(new File("public/CORs/" + resource.posterName));
		listResources();
    }
    
    public static void addLanguage(@Required(message="Id is required") Long languageId,
    		@Required(message="Name is required") String languageName){
    	
        if(validation.hasErrors()) {
            render("Admin/addLanguage.html");
        }

    	System.out.println(languageId + languageName);
    	Language lang = Language.findById(languageId);
    	if(lang == null){
    		new Language(languageId, languageName).save();
    	}
    	listLanguages();
    }
    
    public static void editCategory(Long id){
    	render();
    }
    
    public static void editResource(Long id){
    	render();
    }
    
    public static void editLanguage(@Required(message="Id is required") Long languageId, @Required(message="Name is required") String languageName){
    	System.out.println(languageId + languageName);
    	Language language = Language.findById(languageId);
    	if(languageName == null){
    		render();
    	}
    	else{
	    	language.id = languageId;
	    	language.languageName = languageName;
	    	language._save();
	    	listLanguages();
    	}
    }
    
    public static void deleteCategory(Long id){
    	Category category = Category.findById(id);
    	category._delete();
    	listCategories();
    }
    
    public static void deleteResource(long id) {
 	   final Resource resource = Resource.findById(id);
 	   resource.poster.getFile().delete();
 	   resource.cor.getFile().delete();
 	   resource.delete();
 	   listResources();
    }
    
    public static void deleteLanguage(Long id){
    	Language language = Language.findById(id);
    	language._delete();
    	listLanguages();
    }
    

}
