package controllers;
 
import play.*;
import play.mvc.*;
import models.Resource;

@With(Secure.class)
@CRUD.For(Resource.class)
public class Resources extends CRUD {    
}