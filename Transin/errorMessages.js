/*Created by Zhang Xingping on20170508*/
export const isRequired=name=>`请填写${name} `;
export const lengthMustBe=length=>{
    return (name)=>`${name} 的长度须为 ${length} `;
};
export const beginWithDecimal=name=>`${name}不能以小数点开头`;
export const notZero=name=>`${name}不能为零`;
export const lengthMaximum=length=>{
    return name=>`${name}不能多于${length}个字符`;
}