function startLMS() {
	try {
		this.document.lmsApplet = true;
		var lms = document.lmsImpl.getLMSImplementation( document.location.search );

		if ( !lms )
			return;

		state = lms.getState();
		if ( (state & (1|32 ))==0 ) {
			jLog( "(startLMS) Starting session..." );
			lms.startSession();
		}
	} catch( x ) {
	}
}

function getLMSCore() {
	try {
		try {
			var lms = document.lmsImpl.getLMSImplementation( document.location.search );
		}
		catch( x ) {
			jLog( "(getLMSCore) failed11: "+x.message );
			return "notready";
		}

		if ( !lms ) {
			jLog( "(getLMSCore) LMS not initialized..." );
			return "fail";
		}

		var state = lms.getState();

		if ( (state & 8) ) {	// LOADED
			jLog( "(getLMSCore) data ready..." );
			return lms.getLessonCore();
		} else if ( (state & 16) ) {	// FAILED
			jLog( "(getLMSCore) data failed..." );
			return "fail";
		}

		return "notready";
	} catch( x ) {
		jLog( "(getLMSCore) failed2: "+x.message );
		return "fail";
	}
}

function getLMSState() {
	try {
		try {
			var lms = document.lmsImpl.getLMSImplementation( document.location.search );
		} catch( x ) {
			jLog( "(getLMSCore) failed11: "+x.message );
			return "fail";
		}
		
		var state = lms.getState();
		
		if ( (state & 8) ) {
			return "ready";
		} else if ( (state & 16) ) {
			return "fail";
		}
		
		return "notready";
	} catch( x ) {
		jLog( "(getLMSCore) failed2: "+x.message );
		return "fail";
	}
}

document.LMS_FAIL = new Object();

function getLMSProperty( name ) {
	try {
		var lms = document.lmsImpl.getLMSImplementation( document.location.search );

		if ( !lms )
			return document.LMS_FAIL;

		var state = lms.getState();

		if ( (state & 8) ) {	// LOADED
			return lms.getProperty( name );
		} else if ( (state & 16) ) {	// FAILED
			return document.LMS_FAIL;
		}

		return document.LMS_FAIL;
	} catch( x ) {
		return document.LMS_FAIL;
	}
}
function getLMSMasteryScore() {
	var mastery = getLMSProperty( "student_data.mastery_score" );
	if (mastery===document.LMS_FAIL || mastery=="")
		mastery = getParam(window.location,"mastery");
	if (mastery===null)
		mastery = "";
	return mastery;
}

function getLMSIncomingNOA() {
	try {
		try {
			var lms = getElement( "lmsImpl" ).getLMSImplementation( document.location.search );
		}
		catch( x ) {
			return "notready";
		}

		if ( !lms )
			return "fail";

		var state = lms.getState();

		if ( (state & 8) ) {	// LOADED
			var str = lms.getNOAString();
			return str;
		}
		else if ( (state & 16) ) {	// FAILED
			return "fail";
		}

		return "notready";
	}
	catch( x ) {
		jLog( "(getLMSIncomingNOA) failed2: "+x.message );
		return "fail";
	}
}

window.wasSaveState = false;
function saveState() {
	// saveSate should be called once but on IE is called twice - from onBeforeUnload() and onUnload()
	if (window.wasSaveState) {
		jLog("saveState already called. ignore...");
		return;
	}
	window.wasSaveState = true;
	
	if ( typeof(document.stateTransferred)=="undefined" || document.stateTransferred!=true ) {
		jLog( "(saveState) state was not successfully transferred to FLASH" );
		return;
	}
	if ( typeof(document.page_sessionStarted)=="undefined" || document.page_sessionStarted!=true ) {
		jLog( "(saveState) session not started" );
		return;
	}
		
	try {
		var isCompound = true;
		var lms = document.lmsImpl.getLMSImplementation( document.location.search );

		if ( !lms ) {
			jLog( "(saveState) lms not initialized" );
			return;
		}

		var state = lms.getState();

		if ( (state & 8) ) {	// LOADED
			jLog( "(saveState) state was loaded, creating AICC data" );
			var pageObj = InternetExplorer ? page : document.page;


			pageObj.TCallLabel( "_level0", "xstop" );


			var res = pageObj.GetVariable( "_level0.result" );

			var statestring = pageObj.GetVariable( "_level0.stateString" );
			var time =  pageObj.GetVariable( "_level0.sessionTime" );
			var noa = pageObj.GetVariable( "_level0.noActivities" );
			var lstatus = pageObj.GetVariable( "_level0.lessonStatus" );

			if ( isCompound ) {
				var objectivesResults = pageObj.GetVariable( "_level0.objectivesResults" );
				lms.setObjectivesResults( objectivesResults );
			}

			lms.setResult( res );
			lms.setSessionTime( time );
			lms.setLessonCore( statestring );
			lms.setStatus( lstatus );

			lms.setNOAString( noa );
			
			jLog( "(saveState) syncCommitAndExit" );
			lms._syncCommitAndExit();
			jLog( "(saveState) syncCommitAndExit finished" );
		}
	} catch( x ) {
		jLog( "(saveState) failed: "+x.message );
	}
}

function getStringPreview( str ) {
	if ( typeof(str)=="string" )
		return str.substring( 0, str.length<40 ? str.length : 40 );
	else
		return str;
}
