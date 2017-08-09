/* By Zhang Xingping on 20170717 */
import React from 'react';
import './dumbModal.less'
function DumbModal({show,onClose,...props}){
    return (
        <div>
            
            <div className={`DumbModal--${show?'show':'hidden'}`}>
                
                {props.title?
                    <div className='dumbModal_title'>
                        <span className='text'>{props.title}</span>
                        <span className='yqbfont_gg_guanbi closeDumbIcon'></span>
                    </div>
                    :null
                }
                <div className='dumbModal_bodyBox'>
                    {props.children}
                </div>
                {props.onBottomButtonClick?
                    <div 
                        className='dumbModal_bottomButton' 
                        onClick={props.onBottomButtonClick}>
                    {props.btnText}
                    </div>
                    :null
                }
            </div>
        </div>
    );
}

export default DumbModal;