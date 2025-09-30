#!/bin/bash

# Release: 0.0.1

# ==========================================
# -----> BEGIN: Variables:
# ------------------------------------------
script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
abs_module_dir="$(cd "$script_dir"/.. && pwd)"
sfai_devops_web_release="/base/SoftwareFactoryAI/Departments/DevOps/Repositories/sfai-devops-web/sfai-devops-web/2-gateway-shell"
# ------------------------------------------
# END: Variables <-----
# ==========================================

# ==========================================
# -----> BEGIN: Body:
# ------------------------------------------

chmod +x "$sfai_devops_web_release/cli.sh"
"$sfai_devops_web_release/cli.sh" latest $abs_module_dir
#"$sfai_devops_web_release/cli.sh" 0.0.12 $abs_module_dir

# ------------------------------------------
# END: Body <-----
# ==========================================