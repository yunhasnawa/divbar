/**
 * Created by JetBrains WebStorm.
 * User: yunhasnawa
 * Date: 6/6/12
 * Time: 10:56 PM
 * To change this template use File | Settings | File Templates.
 */

function body_onload() {

    var isReady = document.readyState == 'complete' ? true : false;

    if(isReady){

        var div = document.getElementById('barplace');

        var divbar = new Divbar(div);

        var data = [350, 512, 673, 217, 124, 445, 690, 880, 90, 914];

        divbar.init(data);
        divbar.generate();

    }

}