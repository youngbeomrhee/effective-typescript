"use strict";
{
    // noImplicitAny: true로 설정시 에러로 표시
    function add(a, b) {
        return a + b;
    }
    add(10, null);
}
{
    // strictNullChecks: true인 경우 에러 표시
    const x = null;
}
{
    // strictNullChecks: true인 경우 에러 표시
    const x = null;
}
{
    const el = document.getElementById('status');
    el.textContent = 'Ready';
    if (el) {
        el.textContent = 'Ready';
    }
    el.textContent = 'Ready';
}
{
    // noImplicitAny가 먼저 설정되지 않고 strictNullChecks만 설정됐을 경우의 문제점
    const el = document.getElementById('status');
    function getTextContent(el) {
        return el.textContent;
    }
    getTextContent(el).textContent = 'Ready';
    getTextContent(null).textContent = 'Ready';
}
{
}
