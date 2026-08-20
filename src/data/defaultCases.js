export const defaultCases = [
  {
    id: 'status', category: '기본', title: '현재 Git 상태 확인',
    summary: '수정된 파일, 스테이징 여부, 현재 브랜치 상태를 가장 먼저 확인할 때',
    command: 'git status',
    detail: '작업 전후에 가장 자주 사용하는 기본 명령어입니다. 충돌 해결 후에도 반드시 확인하는 습관이 좋습니다.',
    tags: ['기본', '안전'], keywords: ['상태', '수정파일', '스테이징', '현재상태']
  },
  {
    id: 'log', category: '커밋', title: '최근 커밋 목록 간단히 보기',
    summary: '커밋 해시와 메시지를 한 줄씩 확인하고 싶을 때',
    command: 'git log --oneline --decorate --graph -20',
    detail: '브랜치 흐름까지 같이 보려면 --graph, 브랜치/태그 표시에는 --decorate 옵션이 유용합니다.',
    tags: ['커밋'], keywords: ['로그', '커밋목록', '해시', '기록']
  },
  {
    id: 'fetch', category: '원격', title: '원격 저장소 최신 정보만 가져오기',
    summary: '내 작업 파일은 건드리지 않고 origin의 최신 브랜치/커밋 정보를 갱신할 때',
    command: 'git fetch origin',
    detail: 'fetch는 원격 정보를 가져오지만 현재 브랜치에 자동 병합하지 않습니다. rebase나 비교 전에 자주 사용합니다.',
    tags: ['원격', '안전'], keywords: ['원격최신', 'fetch', 'origin', '최신화']
  },
  {
    id: 'rebase-main', category: '리베이스', title: '현재 작업 브랜치를 최신 origin/main 위로 리베이스',
    summary: '내 작업 브랜치를 원격 main 최신 커밋 뒤에 다시 쌓고 싶을 때',
    command: 'git fetch origin\ngit rebase origin/main',
    detail: '충돌이 생기면 파일을 수정하고 git add 후 git rebase --continue를 반복합니다. 이미 원격에 push한 브랜치라면 이후 force-with-lease가 필요할 수 있습니다.',
    tags: ['리베이스', '주의'], keywords: ['main 최신화', '메인 리베이스', 'rebase origin/main', '최신 main'], danger: 'warning'
  },
  {
    id: 'rebase-continue', category: '리베이스', title: '리베이스 충돌 해결 후 계속 진행',
    summary: '충돌 파일을 수정한 뒤 rebase를 이어서 진행할 때',
    command: 'git add .\ngit rebase --continue',
    detail: '모든 충돌을 해결할 때까지 반복합니다. 리베이스 자체를 취소하려면 git rebase --abort를 사용합니다.',
    tags: ['리베이스', '충돌'], keywords: ['충돌해결', 'continue', '리베이스 계속']
  },
  {
    id: 'rebase-abort', category: '리베이스', title: '진행 중인 리베이스 취소',
    summary: '리베이스 도중 문제가 생겨 시작 전 상태로 돌아가고 싶을 때',
    command: 'git rebase --abort',
    detail: '진행 중이던 rebase를 중단하고 가능한 경우 시작 전 상태로 되돌립니다.',
    tags: ['리베이스', '복구'], keywords: ['리베이스 취소', 'abort', '충돌 취소']
  },
  {
    id: 'push-rejected', category: 'Push/Pull', title: 'push가 non-fast-forward로 거절될 때',
    summary: '원격 브랜치가 내 로컬보다 앞서 있어서 push가 거절된 경우',
    command: 'git fetch origin\ngit rebase origin/현재브랜치\ngit push origin 현재브랜치',
    detail: '다른 사람이 같은 원격 브랜치에 올린 변경을 먼저 반영해야 합니다. 무조건 force push부터 하는 것은 피하는 게 좋습니다.',
    tags: ['Push', '오류'], keywords: ['non-fast-forward', 'push rejected', '푸시 거절', '원격 앞섬'], danger: 'warning'
  },
  {
    id: 'force-with-lease', category: 'Push/Pull', title: '리베이스 후 원격 브랜치 안전하게 강제 push',
    summary: '이미 push한 브랜치를 rebase해서 커밋 해시가 바뀐 뒤 다시 push할 때',
    command: 'git push --force-with-lease origin 현재브랜치',
    detail: '--force보다 안전한 방식입니다. 내가 마지막으로 확인한 원격 상태와 달라졌다면 push를 막아줍니다.',
    tags: ['Push', '주의'], keywords: ['force-with-lease', '강제푸시', '리베이스 push'], danger: 'warning'
  },
  {
    id: 'new-branch-main', category: '브랜치', title: '최신 main 기준으로 새 작업 브랜치 만들기',
    summary: '새 기능 작업을 원격 main 최신 상태에서 시작할 때',
    command: 'git fetch origin\ngit switch main\ngit pull --rebase origin main\ngit switch -c feature/새브랜치',
    detail: '작업 시작 전에 기준 브랜치를 최신화한 뒤 새 브랜치를 생성하는 일반적인 흐름입니다.',
    tags: ['브랜치'], keywords: ['브랜치 생성', 'feature', '새 브랜치', 'main 기준']
  },
  {
    id: 'branch-copy', category: '브랜치', title: '현재 브랜치를 그대로 복사해서 새 브랜치 생성',
    summary: '현재 작업 상태와 커밋을 유지한 채 다른 이름의 브랜치를 만들고 싶을 때',
    command: 'git switch -c work/새브랜치',
    detail: '현재 HEAD를 기준으로 새 브랜치가 생성됩니다. 원본 브랜치는 그대로 남아 있습니다.',
    tags: ['브랜치'], keywords: ['브랜치 복사', 'switch -c', '현재 브랜치 복제']
  },
  {
    id: 'delete-local-branch', category: '브랜치', title: '로컬 브랜치 삭제',
    summary: '작업이 끝난 로컬 브랜치를 정리할 때',
    command: 'git branch -d 브랜치명',
    detail: '병합되지 않은 브랜치는 -d로 삭제가 거절될 수 있습니다. 강제 삭제는 -D지만 작업 손실 가능성이 있으므로 주의하세요.',
    tags: ['브랜치', '주의'], keywords: ['브랜치 삭제', 'branch -d', '로컬 삭제'], danger: 'warning'
  },
  {
    id: 'delete-remote-branch', category: '원격', title: '원격 브랜치 삭제',
    summary: 'origin에 올라간 브랜치를 원격 저장소에서 삭제할 때',
    command: 'git push origin --delete 브랜치명',
    detail: '협업 중인 브랜치인지 확인한 후 사용하세요. 원격 브랜치 삭제는 다른 개발자에게 영향을 줄 수 있습니다.',
    tags: ['원격', '주의'], keywords: ['원격 브랜치 삭제', 'origin delete'], danger: 'danger'
  },
  {
    id: 'restore-file', category: '복구/롤백', title: '수정한 파일을 마지막 커밋 상태로 되돌리기',
    summary: '아직 커밋하지 않은 특정 파일의 수정을 취소하고 싶을 때',
    command: 'git restore 경로/파일명',
    detail: '작업 디렉터리의 변경사항이 사라집니다. 아직 커밋하지 않은 수정이므로 복구가 어려울 수 있어 주의하세요.',
    tags: ['복구', '주의'], keywords: ['파일 원복', 'restore', '수정 취소'], danger: 'warning'
  },
  {
    id: 'unstage', category: '커밋', title: 'git add 한 파일을 스테이징에서 빼기',
    summary: '파일 수정은 유지하고 stage만 취소하고 싶을 때',
    command: 'git restore --staged 경로/파일명',
    detail: '파일의 실제 수정 내용은 유지되고 스테이징 영역에서만 제거됩니다.',
    tags: ['커밋', '안전'], keywords: ['add 취소', 'unstage', '스테이징 취소']
  },
  {
    id: 'amend-message', category: '커밋', title: '마지막 커밋 메시지 수정',
    summary: '방금 만든 커밋의 메시지를 잘못 적었을 때',
    command: 'git commit --amend',
    detail: '이미 원격에 push한 커밋을 amend하면 커밋 해시가 바뀌므로 이후 push 방식에 주의해야 합니다.',
    tags: ['커밋', '주의'], keywords: ['커밋 메시지 수정', 'amend'], danger: 'warning'
  },
  {
    id: 'revert-one', category: '복구/롤백', title: '특정 커밋 하나의 변경사항 취소',
    summary: '기존 기록은 남기고 특정 커밋의 변경만 되돌리고 싶을 때',
    command: 'git revert 커밋해시',
    detail: '기존 커밋을 삭제하지 않고 반대 변경을 가진 새로운 커밋을 생성합니다. 배포된 작업을 안전하게 되돌릴 때 자주 사용합니다.',
    tags: ['Revert', '배포'], keywords: ['커밋 취소', 'revert', '롤백', '배포 원복']
  },
  {
    id: 'revert-range', category: '복구/롤백', title: '여러 개의 연속 커밋을 한 번에 되돌리기',
    summary: '브랜치 작업 커밋이 여러 개인데 하나의 취소 커밋으로 만들고 싶을 때',
    command: 'git revert --no-commit 첫커밋^..마지막커밋\ngit commit -m "Revert branch changes"',
    detail: '범위 사이에 다른 작업의 커밋이 섞여 있으면 같이 취소될 수 있으므로 사용 전 git log로 반드시 범위를 확인하세요.',
    tags: ['Revert', '배포', '주의'], keywords: ['여러 커밋 revert', '범위 revert', '브랜치 전체 원복'], danger: 'warning'
  },
  {
    id: 'reset-soft', category: '복구/롤백', title: '마지막 커밋만 취소하고 변경사항은 유지',
    summary: '커밋을 다시 만들고 싶지만 수정 내용은 그대로 남겨두고 싶을 때',
    command: 'git reset --soft HEAD~1',
    detail: '마지막 커밋만 되돌리고 변경사항은 staged 상태로 유지합니다. 공유된 원격 커밋에는 신중히 사용하세요.',
    tags: ['Reset', '주의'], keywords: ['커밋 취소 유지', 'soft reset'], danger: 'warning'
  },
  {
    id: 'reset-hard', category: '복구/롤백', title: '마지막 커밋과 변경사항까지 완전히 삭제',
    summary: '로컬 변경과 커밋을 모두 버리고 이전 상태로 강제로 돌아갈 때',
    command: 'git reset --hard HEAD~1',
    detail: '작업 내용이 사라질 수 있는 위험한 명령어입니다. 확실하지 않다면 사용하지 마세요.',
    tags: ['Reset', '위험'], keywords: ['hard reset', '강제 롤백', '변경 삭제'], danger: 'danger'
  },
  {
    id: 'stash', category: '작업보관', title: '현재 수정사항 잠시 보관',
    summary: '커밋하기 애매한 작업을 잠시 치워두고 다른 브랜치로 이동해야 할 때',
    command: 'git stash push -m "작업 설명"',
    detail: '보관한 작업은 git stash list로 확인하고 git stash pop으로 다시 적용할 수 있습니다.',
    tags: ['Stash'], keywords: ['임시 저장', 'stash', '작업 보관']
  },
  {
    id: 'stash-pop', category: '작업보관', title: 'stash 해둔 작업 다시 적용',
    summary: '잠시 보관했던 수정사항을 현재 브랜치에 다시 가져올 때',
    command: 'git stash pop',
    detail: '현재 브랜치의 변경과 충돌할 수 있으므로 적용 전 git status를 확인하는 것이 좋습니다.',
    tags: ['Stash', '충돌'], keywords: ['stash 복구', 'stash pop', '임시작업 복원']
  },
  {
    id: 'cherry-pick', category: '커밋', title: '다른 브랜치의 특정 커밋만 가져오기',
    summary: '브랜치 전체가 아니라 필요한 커밋 하나만 현재 브랜치에 적용하고 싶을 때',
    command: 'git cherry-pick 커밋해시',
    detail: '특정 수정만 가져오는 데 유용하지만 동일 변경이 이미 있다면 충돌이 발생할 수 있습니다.',
    tags: ['커밋'], keywords: ['cherry-pick', '특정 커밋 가져오기']
  },
  {
    id: 'diff', category: '기본', title: '커밋 전 변경 내용 확인',
    summary: '내가 어떤 코드를 수정했는지 실제 diff를 확인하고 싶을 때',
    command: 'git diff',
    detail: '스테이징된 변경은 git diff --cached로 확인할 수 있습니다.',
    tags: ['기본', '안전'], keywords: ['diff', '변경내용', '수정 비교']
  },
  {
    id: 'remote-branches', category: '원격', title: '원격 브랜치 목록 확인',
    summary: 'origin에 어떤 브랜치가 있는지 보고 싶을 때',
    command: 'git branch -r',
    detail: '로컬과 원격 브랜치를 함께 보려면 git branch -a를 사용합니다.',
    tags: ['원격'], keywords: ['원격 브랜치 목록', 'branch -r']
  },
  {
    id: 'worktree', category: '브랜치', title: '브랜치 두 개를 동시에 다른 폴더에서 작업',
    summary: '현재 작업을 유지하면서 다른 브랜치를 별도 디렉터리에 열고 싶을 때',
    command: 'git worktree add ../프로젝트-다른작업 브랜치명',
    detail: '하나의 저장소에서 브랜치별 작업 디렉터리를 따로 둘 수 있어 테스트 서버나 동시 작업에 편리합니다.',
    tags: ['브랜치', 'Worktree'], keywords: ['worktree', '브랜치 동시에', '다른 폴더']
  },
  {
    id: 'reflog', category: '복구/롤백', title: '삭제하거나 잃어버린 커밋 위치 찾기',
    summary: 'reset, rebase, 브랜치 삭제 후 이전 HEAD를 찾고 싶을 때',
    command: 'git reflog',
    detail: '최근 HEAD 이동 기록을 보여줍니다. 실수로 사라진 것처럼 보이는 커밋을 복구할 때 매우 유용합니다.',
    tags: ['복구', '고급'], keywords: ['reflog', '커밋 복구', '삭제 브랜치 복구']
  },
  {
    id: 'tag', category: '배포', title: '배포 시점에 태그 남기기',
    summary: '실서버 배포 버전을 명확히 기록해서 나중에 어떤 커밋이 배포됐는지 찾고 싶을 때',
    command: 'git tag -a v1.0.0 -m "production deploy"\ngit push origin v1.0.0',
    detail: '배포 시점에 태그를 남기면 긴급 롤백이나 배포 이력 확인이 훨씬 쉬워집니다.',
    tags: ['배포', '추천'], keywords: ['tag', '배포 버전', '실서버 태그']
  },
  {
    id: 'prod-revert', category: '배포', title: '브랜치2까지 배포한 뒤 브랜치1 변경만 롤백',
    summary: '실서버 최신 상태는 유지하면서 이전 브랜치의 문제 작업만 제거해야 할 때',
    command: 'git fetch origin\ngit switch main\ngit pull --rebase origin main\ngit switch -c hotfix/revert-branch1\ngit revert --no-commit 첫커밋^..마지막커밋\ngit commit -m "Revert branch1 changes"',
    detail: '실서버 전체를 과거 시점으로 돌리는 대신 현재 최신 코드에서 문제 변경만 반대로 적용합니다. 범위가 정확한지 반드시 확인하세요.',
    tags: ['배포', 'Revert', '실무'], keywords: ['실서버 롤백', '브랜치1만 취소', '브랜치2 유지', '배포 되돌리기'], danger: 'warning'
  },
  {
    id: 'show-commit-files', category: '커밋', title: '특정 커밋에서 변경된 파일 확인',
    summary: '어떤 커밋이 어떤 파일을 수정했는지 보고 싶을 때',
    command: 'git show --stat 커밋해시',
    detail: '실제 코드 diff까지 보려면 git show 커밋해시를 사용합니다.',
    tags: ['커밋'], keywords: ['커밋 파일', 'show stat', '변경 파일']
  },
  {
    id: 'current-branch', category: '기본', title: '현재 브랜치 이름 확인',
    summary: '명령 실행 전에 내가 어느 브랜치에 있는지 빠르게 확인할 때',
    command: 'git branch --show-current',
    detail: 'rebase, reset, push 같은 명령 전에 현재 브랜치를 확인하면 실수를 줄일 수 있습니다.',
    tags: ['기본', '안전'], keywords: ['현재 브랜치', '브랜치 이름']
  },
  {
    id: 'clone-repository', category: '원격', title: '원격 저장소를 처음 내려받기',
    summary: 'GitHub 등에 있는 프로젝트를 내 컴퓨터에 새 작업 폴더로 복제할 때',
    command: 'git clone 저장소주소\ncd 저장소이름',
    detail: 'clone은 파일뿐 아니라 커밋 기록과 원격 연결 정보까지 함께 내려받습니다. 특정 브랜치만 필요하면 --branch 브랜치명 옵션을 사용할 수 있습니다.',
    tags: ['원격', '시작'], keywords: ['clone', '저장소 복제', '프로젝트 받기', '처음 내려받기']
  },
  {
    id: 'pull-rebase', category: 'Push/Pull', title: '원격 변경을 깔끔하게 rebase로 반영',
    summary: '불필요한 merge 커밋 없이 원격 최신 변경 뒤에 내 커밋을 이어 붙일 때',
    command: 'git pull --rebase origin 현재브랜치',
    detail: '아직 push하지 않은 로컬 커밋이 있을 때 유용합니다. 충돌이 나면 해결 후 git rebase --continue를 실행하고, 취소하려면 git rebase --abort를 사용하세요.',
    tags: ['Pull', '리베이스'], keywords: ['pull rebase', '원격 반영', 'merge 커밋 방지'], danger: 'warning'
  },
  {
    id: 'merge-abort', category: '병합', title: '충돌 난 merge를 시작 전으로 취소',
    summary: '병합 충돌 해결이 어렵거나 잘못된 브랜치를 합쳐 merge 자체를 중단할 때',
    command: 'git merge --abort',
    detail: '진행 중인 merge를 중단하고 가능한 한 병합 시작 전 상태로 복원합니다. 실행 전 git status로 현재 merge 상태인지 확인하세요.',
    tags: ['병합', '복구'], keywords: ['merge 취소', '병합 충돌 취소', 'merge abort']
  },
  {
    id: 'stash-list-show', category: '작업보관', title: '보관한 stash 목록과 내용 확인',
    summary: '여러 stash 중 어떤 작업을 복원해야 하는지 먼저 확인할 때',
    command: 'git stash list\ngit stash show -p stash@{0}',
    detail: 'list에서 stash 번호와 메시지를 확인하고 show -p로 실제 변경 내용을 검토합니다. 확인 후 git stash apply stash@{번호}로 원하는 항목만 적용할 수 있습니다.',
    tags: ['Stash', '안전'], keywords: ['stash 목록', 'stash 내용', '임시 작업 확인']
  },
  {
    id: 'clean-preview', category: '복구/롤백', title: '추적되지 않은 파일 삭제 전 미리보기',
    summary: '빌드 결과물 등 Git이 추적하지 않는 파일을 정리하기 전에 삭제 대상을 확인할 때',
    command: 'git clean -nd\n# 확인 후 실제 삭제\ngit clean -fd',
    detail: '반드시 -n으로 삭제 대상을 먼저 확인하세요. -fd를 실행하면 추적되지 않은 파일과 폴더가 삭제되며 일반적인 Git 복구가 어렵습니다.',
    tags: ['정리', '위험'], keywords: ['git clean', 'untracked 삭제', '파일 정리', '미리보기'], danger: 'danger'
  },
  {
    id: 'compare-branches', category: '기본', title: '두 브랜치의 커밋과 코드 차이 비교',
    summary: '병합이나 배포 전에 작업 브랜치가 main과 어떻게 다른지 확인할 때',
    command: 'git log --oneline main..현재브랜치\ngit diff main...현재브랜치',
    detail: '첫 명령은 현재 브랜치에만 있는 커밋을, 두 번째 명령은 공통 조상 이후의 코드 변경을 보여줍니다. PR 생성 전 자체 검토에 유용합니다.',
    tags: ['비교', '안전'], keywords: ['브랜치 비교', 'diff branch', '커밋 차이', 'PR 확인']
  },
  {
    id: 'bisect-bug', category: '고급', title: '버그가 시작된 커밋을 이진 탐색으로 찾기',
    summary: '커밋이 많아 어느 변경부터 문제가 생겼는지 빠르게 좁혀야 할 때',
    command: 'git bisect start\ngit bisect bad\ngit bisect good 정상커밋해시\n# 각 단계 테스트 후 good 또는 bad\ngit bisect reset',
    detail: 'Git이 정상 커밋과 문제 커밋 사이를 절반씩 이동시킵니다. 각 단계에서 테스트하고 good 또는 bad를 표시하면 원인 커밋을 빠르게 찾을 수 있습니다.',
    tags: ['디버깅', '고급'], keywords: ['bisect', '버그 커밋 찾기', '이진 탐색', '원인 추적']
  },
  {
    id: 'rename-branch', category: '브랜치', title: '현재 브랜치 이름 변경 후 원격에 반영',
    summary: '오타가 있거나 브랜치 네이밍 규칙에 맞게 현재 브랜치 이름을 바꿀 때',
    command: 'git branch -m 새브랜치명\ngit push -u origin 새브랜치명\ngit push origin --delete 이전브랜치명',
    detail: '새 이름을 먼저 push하고 정상 연결을 확인한 뒤 이전 원격 브랜치를 삭제하세요. 협업자가 사용 중인 브랜치라면 변경 사실을 먼저 공유해야 합니다.',
    tags: ['브랜치', '원격', '주의'], keywords: ['브랜치 이름 변경', 'branch rename', '원격 이름 변경'], danger: 'warning'
  }
];
