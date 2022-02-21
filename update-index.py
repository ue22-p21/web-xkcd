import markdown2

with open("index.md") as f:
    html = markdown2.markdown(
        f.read(), extras=['fenced-code-blocks'])

with open("index-source.html") as f:
    original = f.read()

with open("index.html", 'w') as f:
    f.write(original.
    replace('<<include index.md>>', html))
