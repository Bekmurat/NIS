package controllers;
 
import play.*;
import play.mvc.*;
import models.Language;

@With(Secure.class)
@CRUD.For(Language.class)
public class Languages extends CRUD {    
}