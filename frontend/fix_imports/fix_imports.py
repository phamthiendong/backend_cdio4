import os, re

base_dir = "../src"
pattern = re.compile(r'import\s+(.*?)\s+from\s+[\'"]([^\'"]+)[\'"]')

for root, _, files in os.walk(base_dir):
    for file in files:
        if file.endswith((".js", ".jsx")):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()

            updated = content
            matches = pattern.findall(content)
            for full, old_path in matches:
                # bỏ qua import từ thư viện
                if not old_path.startswith((".", "/")):
                    continue

                # chuẩn hóa lại đường dẫn tương đối
                new_path = old_path.replace("../../../", "../../").replace("../../../../", "../../")
                new_path = new_path.replace("../pages/", "../../pages/")
                new_path = new_path.replace("../api/", "../../api/")
                new_path = new_path.replace("../components/", "../../components/")
                new_path = new_path.replace("../layouts/", "../../layouts/")
                new_path = new_path.replace("./", "")

                if new_path != old_path:
                    updated = updated.replace(old_path, new_path)
                    print(f"✔ {path}: {old_path} → {new_path}")

            if updated != content:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(updated)
