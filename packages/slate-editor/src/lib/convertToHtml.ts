function convertToHtml(anything: any): string {
    const div = document.createElement('div');
    div.appendChild(anything);
    return div.innerHTML;
}

export default convertToHtml;
